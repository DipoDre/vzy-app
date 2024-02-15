import { body, param } from "express-validator";

const PW_OPTIONS = {
	minLength: 8,
	minSymbols: 1,
	minNumbers: 1,
	minUppercase: 1,
	minLowercase: 1
};

const signUpUserRules = () => [
	body("firstName").isString().withMessage("firstName must be a string"),
	body("lastName").isString().withMessage("lastName must be a string"),
	body("email").isEmail().withMessage("Invalid email"),
	body("password")
		.isStrongPassword(PW_OPTIONS)
		.withMessage(
			"Password must be 8 characters or more. It must contain at least one number, one special character, one lowercase and  one uppercase alphabets"
		)
];

const loginUserRules = () => [
	body("email").isEmail().withMessage("Invalid email"),
	body("password")
		.isStrongPassword(PW_OPTIONS)
		.withMessage(
			"Password must be 8 characters or more. It must contain at least one number, one special character, one lowercase and  one uppercase alphabets"
		)
];

const updateUserRules = () => [
	body("firstName")
		.isString()
		.optional()
		.withMessage("firstName must be a string"),
	body("lastName")
		.isString()
		.optional()
		.withMessage("lastName must be a string"),
	body("password")
		.isStrongPassword(PW_OPTIONS)
		.optional()
		.withMessage(
			"Password must be 8 characters or more. It must contain at least one number, one special character, one lowercase and  one uppercase alphabets"
		)
];

export default {
	signUpUserRules,
	loginUserRules,
	updateUserRules
};
