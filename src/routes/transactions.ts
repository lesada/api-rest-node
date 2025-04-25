import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
	app.post("/", async (req, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(["credit", "debit"]),
		});

		const { amount, title, type } = createTransactionBodySchema.parse(req.body);

		const transaction = await knex("transactions")
			.insert({
				id: crypto.randomUUID(),
				title,
				amount: type === "credit" ? amount : -amount,
			})
			.returning("*");

		return reply.status(201).send(transaction);
	});
}
