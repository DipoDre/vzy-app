import Event from "../../common/event.js";
import userJobs from "./user.jobs.js";

Event.on("stripe-event", async context => {
	try {
		let runResponse = await userJobs.verifyToUpdateUserStatus(context);
		console.log(runResponse);
	} catch (error) {
		console.log("Stripe Event Job Failed");
	}
});
