import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { checkSessionIdExists } from "../../middlewares/check-session-id-exists";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
	app.get(
		"/",
		{
			preHandler: [checkSessionIdExists],
		},
		async (request) => {
			const { sessionId } = request.cookies;

			const transactions = await knex("transactions")
				.where("session_id", sessionId)
				.select();

			return { transactions };
		},
	);

	app.get(
		"/:id",
		{
			preHandler: [checkSessionIdExists],
		},
		async (req, reply) => {
			const getTransactionParamsSchema = z.object({
				id: z.string().uuid(),
			});

			const { id } = getTransactionParamsSchema.parse(req.params);

			const transaction = await knex("transactions")
				.where({ id: id, session_id: req.cookies.sessionId })
				.first();

			return reply.status(200).send({
				transaction,
			});
		},
	);

	app.get(
		"/summary",
		{
			preHandler: [checkSessionIdExists],
		},
		async (req, reply) => {
			const summary = await knex("transactions")
				.where("session_id", req.cookies.sessionId)
				.sum("amount", { as: "amount" })
				.first();

			return reply.status(200).send({ summary });
		},
	);

	app.post("/", async (req, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(["credit", "debit"]),
		});

		const { amount, title, type } = createTransactionBodySchema.parse(req.body);

		let sessionId = req.cookies.sessionId;

		if (!sessionId) {
			sessionId = crypto.randomUUID();

			reply.setCookie("sessionId", sessionId, {
				path: "/",
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
			});
		}

		const transaction = await knex("transactions")
			.insert({
				id: crypto.randomUUID(),
				title,
				amount: type === "credit" ? amount : -amount,
				session_id: sessionId,
			})
			.returning("*");

		return reply.status(201).send({ transaction });
	});
}
