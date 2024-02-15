import main from "./server.js";

main()
	.then(() => {
		console.log("Server started");
	})
	.catch(error => {
		console.log("Starting Server failed");
		console.log("Main Error: ", error);
	});

process.on("unhandledRejection", reason => {
	console.log("Unhandled-Rejection Error: ", reason);
});

process.on("uncaughtException", reason => {
	console.log("Uncaught-Exception Error: ", reason);
});
