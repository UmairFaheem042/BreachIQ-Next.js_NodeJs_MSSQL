import express from "express"
import { getTrackHistory, trackEmailHistory, updateTrackEmail } from "../controllers/trackEmail.controller.js";
import { authenticate } from "../lib/auth.js";

const trackedEmailRouter = express.Router();

trackedEmailRouter.get("/", authenticate, trackEmailHistory);
trackedEmailRouter.get("/track", authenticate, updateTrackEmail);
trackedEmailRouter.get("/history", authenticate, getTrackHistory);

export default trackedEmailRouter;