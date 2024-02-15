import express from "express";
import WebHookController from "./webhook.controllers.js";

const router = express.Router();

// Verify Payment
router.post(
	"/stripe",
	express.raw({ type: "application/json" }),
	WebHookController.verify
);

export default router;
