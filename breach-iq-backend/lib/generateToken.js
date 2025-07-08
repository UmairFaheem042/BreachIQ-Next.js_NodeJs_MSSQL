import jwt from "jsonwebtoken"
import { jwt_secret } from "./constants.js"

export const generateJWToken = (payload) => {
    return jwt.sign(payload, jwt_secret, { expiresIn: "1d" });
}