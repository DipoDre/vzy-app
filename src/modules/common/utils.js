import config from "../../config/index.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const { PORT, NODE_ENV, AUTH_SECRET } = config;

let envJwtSecret = AUTH_SECRET;

export const createError = (
	message,
	code = 403,
	// validations?
	validations = null
) => {
	const err = new Error(message);
	// @ts-ignore
	err.code = code;
	// @ts-ignore
	err.validations = validations;
	return err;
};

// Accessing JWT Secret
if (typeof process.env.AUTH_SECRET !== "string") {
	throw createError("Jwt Secret Env Variable is missing", 500);
}

export const success = (msg, data, meta = null) => ({
	data,
	status: true,
	message: msg,
	...(meta && { meta })
});

export async function Authenticate(req, res, next) {
	try {
		if (req.user) {
			return next();
		}

		const authHeader = req.get("Authorization");
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			throw createError("Authorization Header not provided!", 403);
		}

		const user = jwt.verify(token, process.env.AUTH_SECRET);
		req.user = user;
		return next();
	} catch (e) {
		if (e.message === "invalid signature") {
			return next(createError("Invalid token", 403));
		}

		if (e.message === "jwt expired") {
			return next(createError("Expired token", 403));
		}

		return next(e);
	}
}

export function errorHandler(error, req, res, _next) {
	try {
		if (error.validations) {
			return res.status(422).json({
				status: false,
				message: "All fields are required",
				data: error.validations
			});
		}

		let code = error.code || 400;
		let msg = error.message || "Exception 400! Operation failed.";

		console.log(error.name || "Error", error.message, error.stack);

		return res.status(code || 500).json({ status: false, message: msg });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ status: false });
	}
}

export const validate = (req, _res, next) => {
	try {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			return next();
		}

		const extractedErrors = [];
		// errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
		errors.array().map(err => extractedErrors.push({ [err.type]: err.msg }));

		throw createError("Validation failed", 400, extractedErrors);
	} catch (e) {
		return next(e);
	}
};

export const AuthenticateUser = params => {
	const token = jwt.sign(
		{
			...params
		},
		envJwtSecret,
		{ expiresIn: 60 }
	);
	return token;
};

export const decodeJWT = token => {
	const user = jwt.verify(token, envJwtSecret);
	return user;
};
