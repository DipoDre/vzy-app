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

// Update a User
router.put(
	"/:userId",
	Authenticate,
	UserValidator.updateUserRules(),
	validate,
	UserController.updateUser
);

export default router;
