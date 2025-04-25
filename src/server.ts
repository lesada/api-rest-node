import fastify from "fastify";

const app = fastify();

app.get("/health", async () => {
	return {
		status: "ok",
	};
});

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`HTTP Server Running in ${env.PORT} 👾`);
	});
