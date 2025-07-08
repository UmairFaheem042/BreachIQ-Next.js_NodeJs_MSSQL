import express from "express";
import { getAllBreaches, getLastBreach } from "../controllers/breach.controller.js";
import { authenticate } from "../lib/auth.js";

const breachRouter = express.Router();

breachRouter.get("/", authenticate, getLastBreach);
breachRouter.get("/all", authenticate, getAllBreaches);

export default breachRouter;