import jwt from "jsonwebtoken";
import { jwt_secret } from "./constants.js";

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token not provided'
        });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded; // Add user info to request
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid Token'
        });
    }
} 