import { createError, success } from "../../common/utils.js";
import Event from "../../common/event.js";
import config from "../../../config/index.js";
import Stripe from "stripe";
const { STRIPE_ENDPOINT_SECRET, STRIPE_SECRET_KEY } = config;

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Verify Payment & Update User Status
const verify = async (req, res, next) => {
	try {
		const signature = req.headers["stripe-signature"];

		let event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			STRIPE_ENDPOINT_SECRET
		);

		// Emit event to stripe-event consumer
		Event.emit("stripe-event", {
			event
		});

		return res.status(200).json(success("Event received"));
	} catch (e) {
		const newError = createError("Webhook signature verification failed", 400);
		return next(newError);
	}
};

export default {
	verify
};
