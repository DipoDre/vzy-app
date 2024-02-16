import { Router } from "express";
import UserController from "./user.controllers.js";
import { validate, Authenticate } from "../../common/utils.js";
import UserValidator from "./user.validators.js";

const router = Router();

// Sign up a User
router.post(
	"/signup",
	UserValidator.signUpUserRules(),
	validate,
	UserController.createUser
);

// Log in User
router.post(
	"/login",
	UserValidator.loginUserRules(),
	validate,
	UserController.loginUser
);

// Get a User
router.get("/", Authenticate, UserController.getUser);

// Update a User
router.put(
	"/update",
	Authenticate,
	UserValidator.updateUserRules(),
	validate,
	UserController.updateUser
);

export default router;
