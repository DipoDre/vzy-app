import UserService from "./user.service.js";
import { hash, decrypt } from "../../common/hashes.js";
import { createError, success, AuthenticateUser } from "../../common/utils.js";
import { nanoid } from "nanoid";
import "./user.consumer.js";

// Create a User
const createUser = async (req, res, next) => {
	try {
		const newUser = req.body;

		const lowerCasedEmail = newUser.email.toLowerCase();
		const hashedPassword = hash(newUser.password);
		const customerId = nanoid();

		const userToCreate = {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			password: newUser.password,
			email: lowerCasedEmail,
			password: hashedPassword,
			customerId
		};

		const user = await UserService.findUser(userToCreate.email);

		if (user) {
			throw createError("Email exist", 400);
		}
		const createdUser = await UserService.createUser(userToCreate);

		const { email } = createdUser;
		const userDetails = { email };

		return res
			.status(201)
			.json(
				success(
					"User was created successfully. Proceed to Log In.",
					userDetails
				)
			);
	} catch (error) {
		return next(error);
	}
};

// Log in User
const loginUser = async (req, res, next) => {
	try {
		const inputEmail = req.body.email;
		const inputPassword = req.body.password;

		const userEmail = inputEmail.toLowerCase();

		const user = await UserService.findUser(userEmail).catch(e => {
			throw e;
		});

		if (!user) {
			throw createError("Invalid credentials", 400);
		}

		const isValidPassword = decrypt(inputPassword, user.password);

		if (!isValidPassword) {
			throw createError("Invalid credentials", 400);
		}

		const { firstName, lastName, id, email, customerId, status } = user;

		const userDetails = { firstName, id, email, customerId, status };

		const token = AuthenticateUser({
			id,
			firstName,
			lastName,
			email,
			customerId
		});

		return res
			.status(200)
			.json(success("Login successful", userDetails, { token }));
	} catch (e) {
		return next(e);
	}
};

// Get a User
const getUser = async (req, res, next) => {
	try {
		const authenticatedUser = req.user;
		const userId = authenticatedUser.id;

		const user = await UserService.findUserByID(userId).catch(e => {
			throw e;
		});

		if (!user) {
			throw createError("User not found", 400);
		}

		const { firstName, id, email, customerId, status } = user;

		const userDetails = { firstName, id, email, customerId, status };

		return res
			.status(200)
			.json(success("User was retrieved successfully", userDetails));
	} catch (e) {
		return next(e);
	}
};

// Update User
const updateUser = async (req, res, next) => {
	try {
		const authenticatedUser = req.user;
		const userId = authenticatedUser.id;
		const { firstName, lastName, password } = req.body;

		if (!firstName && !lastName && !password) {
			throw createError("Invalid update request", 400);
		}
		let updateData = {};

		const user = await UserService.findUserByID(userId).catch(e => {
			throw e;
		});

		if (!user) {
			throw createError("User not found", 400);
		}

		if (password) {
			const hashedPassword = hash(password);
			updateData = { password: hashedPassword };
		} else {
			if (firstName) {
				updateData.firstName = firstName;
			}

			if (lastName) {
				updateData.lastName = lastName;
			}
		}

		const updatedUser = await UserService.updateUser(userId, updateData).catch(
			e => {
				throw e;
			}
		);

		/* if (updateInfo.modifiedCount !== 1) {
			throw createError("User was not updated", 400);
		} */

		return res
			.status(200)
			.json(success("User was updated successfully", updatedUser.id));
	} catch (e) {
		return next(e);
	}
};

export default {
	getUser,
	createUser,
	loginUser,
	updateUser
};
