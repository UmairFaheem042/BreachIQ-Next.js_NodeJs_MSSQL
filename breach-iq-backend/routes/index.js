import express from "express"
import userRouter from "./user.routes.js";
import trackedEmailRouter from "./trackEmail.routes.js";
import breachRouter from "./breach.routes.js";

const router = express.Router()

router.use("/users", userRouter);
router.use("/tracked-emails", trackedEmailRouter);
router.use("/breaches", breachRouter);

export default router;