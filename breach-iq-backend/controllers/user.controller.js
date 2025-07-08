import TrackedEmail from "../models/trackEmail.model.js";
import User from "../models/user.model.js";
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { google } from "../lib/oauth.js";
import { node_environment, OAUTH_EXCHANGE_EXPIRY } from "../lib/constants.js";
import { generateJWToken } from "../lib/generateToken.js";

export const registerUser_oauth = async (req, res) => {
    try {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        const url = google.createAuthorizationURL(state, codeVerifier, [
            "openid", // will give tokens
            "profile", // will given user information
            "email"
        ])

        // save state in session
        const cookieConfig = {
            httpOnly: true,
            secure: node_environment === 'production',
            maxAge: OAUTH_EXCHANGE_EXPIRY,
            sameSite: "lax"
        }

        res.cookie("google_oauth_state", state, cookieConfig);
        res.cookie("google_code_verifier", codeVerifier, cookieConfig);

        res.redirect(url.toString());

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while registering a user with google",
            error: error.message
        })
    }
}

export const getGoogleLoginCallback = async (req, res) => {
    const { code, state } = req.query
    const { google_oauth_state: storedState, google_code_verifier: codeVerifier } = req.cookies

    if (!code || !state || !storedState || !codeVerifier || state !== storedState)
        return res.status(400).json({
            success: false,
            message: "Could not login with Google"
        })


    try {
        // get tokens from google
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);

        // decode ID Token
        const claims = decodeIdToken(tokens.idToken())
        const { sub: googleUserId, name, email, given_name: first_name, family_name: last_name, picture: profile_image } = claims;

        // 3 things to do now

        // ✅ Check if user exists with Google OAuth linked
        let user = await User.findOne({
            // where: { email, oauthProvider: 'google', oauthId: googleUserId }
            where: { email }
        });


        if (!user) {
            console.log("Creating new user with Google OAuth...");
            user = await User.create({
                email,
                first_name,
                last_name,
                profile_image,
                oauthProvider: 'google',
                oauthId: googleUserId
            });
            console.log("After user creation");
            await TrackedEmail.create({
                email_to_track: email,
                last_checked: Date.now(),
                breach_count: null,
                user_id: user.id
            });
        } else {
            console.log("User already linked with Google.");
        }

        const token = generateJWToken({ id: user.id, email: user.email });
        console.log("after generating token");

        res.cookie('token', token, {
            httpOnly: true,
            // secure: node_environment === 'production',
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.clearCookie("google_oauth_state");
        res.clearCookie("google_code_verifier");

        return res.redirect("http://localhost:3000/dashboard"); // ✅ Redirect to frontend

    } catch (error) {
        console.error("OAuth Callback Error:", error);
        return res.status(500).json({
            success: false,
            message: "an error occurred",
            error: error.message
        })
    }

}

export const logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        // secure: node_environment === 'production',
        secure: false,
        sameSite: 'strict',
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}

export const getUserById = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findOne({ where: { id }, attributes: { exclude: "password" } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with that ID"
            })
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching single user by ID",
            error: error.message
        })
    }
}

export const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ where: { email }, attributes: { exclude: "password" } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with that email"
            })
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching single user by email",
            error: error.message
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: "password" } });

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching all users",
            error: error.message
        })
    }
}