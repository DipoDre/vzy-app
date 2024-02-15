import UserService from "./user.service.js";

// Verify Payment & Update User Status
const verifyToUpdateUserStatus = async context => {
	try {
		const event = context.event;
		if (event.type === "payment_intent.succeeded") {
			const paymentIntent = event.data.object;
			const idempotencyKey = event.request.idempotency_key;
			const customerId = paymentIntent?.metadata?.customerId;

			if (!customerId) {
				return {
					success: false,
					message: "Customer-Id in the metadata field is required"
				};
			}

			let user = await UserService.findUserByCustomerID(customerId);

			if (!user) {
				return { success: false, message: "User does not exist" };
			}
			if (idempotencyKey === user.idempotentKey) {
				return {
					success: false,
					message: "User status has been previously updated"
				};
			}

			// Update User status (payment)
			let result = await UserService.updateUser(user.id, {
				status: "paid",
				idempotentKey: idempotencyKey
			});

			return {
				success: true,
				message: `PaymentIntent for ${user.email} was successful!`
			};
		} else {
			// Unexpected event type
			console.log(`Unhandled event type ${event.type}.`);
			return {
				success: false,
				message: `Unhandled event type ${event.type}.`
			};
		}
	} catch (err) {
		console.log({
			success: false,
			message: `Error occurred while verifying and updating user status for customer with id ${context?.event?.data?.object?.customer}`,
			error: err
		});

		throw err;
	}
};

export default {
	verifyToUpdateUserStatus
};
