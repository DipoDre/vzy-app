import config from "./config/index.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import { createMongoDBConnection } from "./config/mongoose.js";

import routes from "./routes.js";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./modules/common/utils.js";

const app = express();

const { PORT, DATABASE_URL } = config;
const morganConfig = "dev";

app.use(
	morgan(morganConfig),
	rateLimit({
		windowMs: 5 * 60 * 1000, // 10 minutes
		max: 5000, // limit each IP to 5000 requests per windowMs
		message: "Too many request from this IP, please try again after 10 minutes"
	}),
	cors({
		origin: (_origin, callback) => {
			callback(null, true);
		},
		credentials: true
	}),
	helmet(),
	compression(),
	express.urlencoded({ extended: true, limit: "10mb" }),
	// express.json({ limit: "10mb" }),
	routes,
	errorHandler
);

app.disable("x-powered-by");

// Start the server
const main = async () => {
	try {
		await createMongoDBConnection();

		app.listen(PORT || 2005, () => {
			console.log(`Server started on port: ${PORT}`);
		});
	} catch (error) {
		throw error;
	}
};

export default main;
