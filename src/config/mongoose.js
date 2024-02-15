import mongoose from "mongoose";
import config from "./index.js";

export const createMongoDBConnection = async () => {
	try {
		// connect to mongodb
		const { DATABASE_URL } = config;

		await mongoose.connect(DATABASE_URL);

		console.log("MongoDB Connected");

		mongoose.connection.on("error", error => {
			console.log("Error occurred on current MongoDB connection: ", error);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
		});
	} catch (error) {
		console.log("Initial connection to MongoDB failed: ", error);
	}
};
