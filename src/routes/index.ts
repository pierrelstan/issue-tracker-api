import express from "express";
import healthcheckRoute from "./healthcheck.route"
const router = express.Router();

router.use("/health",healthcheckRoute);

export default router;
