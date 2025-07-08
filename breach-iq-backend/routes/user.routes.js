import express from "express";
import { getAllUsers, getGoogleLoginCallback, getUserByEmail, getUserById, logoutUser, registerUser_oauth } from "../controllers/user.controller.js";
import { authenticate } from "../lib/auth.js";

const userRouter = express.Router();

userRouter.get("/oauth/google", registerUser_oauth);
userRouter.get("/google/callback", getGoogleLoginCallback);
userRouter.post("/logout", logoutUser);

// Fetch user(s)
// userRouter.get("/me", getAllUsers);
userRouter.get("/me", authenticate, getUserById);
userRouter.get("/", getAllUsers);
userRouter.get("/by-email", getUserByEmail);

export default userRouter;