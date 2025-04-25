import cookie from "@fastify/cookie";
import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(cookie);
app.register(transactionsRoutes, { prefix: "/transactions" });

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
