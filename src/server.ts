import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.get("/health", async () => {
	return {
		status: "ok",
	};
});

app.register(transactionsRoutes, { prefix: "/transactions" });

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`HTTP Server Running in ${env.PORT} 👾`);
	});
