import { Router } from "express";
import usersRoutes from "./user/user.routes.js";
import webHookRoutes from "./webhook/webhook.route.js";
import bodyParser from "body-parser";

import { createError } from "../common/utils.js";

const jsonParser = bodyParser.json();
const router = Router();

router.use("/auth", jsonParser, usersRoutes);
router.use("/webhook", webHookRoutes);

router.all("*", (req, res, next) => {
	return next(createError("Resource Not Found", 404));
});

export default router;
