import User from "../../../database/models/user.js";

// Find a User
const findUser = async email => {
	const user = await User.findOne({
		email
	});
	return user;
};

// Find a User by ID
const findUserByID = async id => {
	const user = await User.findById(id);
	return user;
};

// Find a User by Customer ID
const findUserByCustomerID = async customerId => {
	const user = await User.findOne({
		customerId
	});
	return user;
};

// Create a User
const createUser = async data => {
	const user = await User.create(data);
	return user;
};

// Update a User
const updateUser = async (userId, data) => {
	const user = await User.findByIdAndUpdate(userId, data, {
		new: true
	});
	return user;
};

export default {
	findUser,
	findUserByID,
	findUserByCustomerID,
	createUser,
	updateUser
};
