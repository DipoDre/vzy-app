/* eslint-disable max-len */
import dotenv from "dotenv";

dotenv.config();

const config = {
	PORT: process.env.PORT,
	DATABASE_URL: process.env.DATABASE_URL,
	AUTH_SECRET: process.env.AUTH_SECRET,
	STRIPE_PUB_KEY: process.env.STRIPE_PUB_KEY,
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
	STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET
};

export default config;
