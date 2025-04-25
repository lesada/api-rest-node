import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
	app.get("/", async (_, reply) => {
		const transactions = await knex("transactions").select("*");

		return reply.status(200).send({
			transactions,
		});
	});

	app.get("/:id", async (req, reply) => {
		const getTransactionParamsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = getTransactionParamsSchema.parse(req.params);

		const transaction = await knex("transactions").where("id", id).first();

		return reply.status(200).send({
			transaction,
		});
	});

	app.get("/summary", async () => {
		const summary = await knex("transactions")
			.sum("amount", { as: "amount" })
			.first();

		return { summary };
	});

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
