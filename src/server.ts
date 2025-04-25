import fastify from "fastify";

const app = fastify();

app.get("/health", async () => {
	return {
		status: "ok",
	};
});

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP Server Running in 3333 👾");
	});
