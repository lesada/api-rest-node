import { execSync } from "node:child_process";
import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, expect, test } from "vitest";
import { app } from "../src/app";

describe("Transactions routes", () => {
	beforeAll(async () => {
		await app.ready();
	});

	beforeEach(() => {
		execSync("npm run knex migrate:rollback --all");
		execSync("npm run knex migrate:latest");
	});

	afterAll(async () => {
		await app.close();
	});

	test("user can create a new transaction", async () => {
		const response = await request(app.server).post("/transactions").send({
			title: "Transaction 1",
			amount: 1000,
			type: "debit",
		});

		expect(response.statusCode).toBe(201);
	});

	test("user can list all transactions", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "New transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie");

		if (!cookies) throw new Error("no cookies were found");

		const listTransactionsResponse = await request(app.server)
			.get("/transactions")
			.set("Cookie", cookies)
			.expect(200);

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: "New transaction",
				amount: 5000,
			}),
		]);
	});

	test("get a specific transaction", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "New transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie");
		if (!cookies) throw new Error("no cookies were found");

		const listTransactionsResponse = await request(app.server)
			.get("/transactions")
			.set("Cookie", cookies)
			.expect(200);

		const transactionId = listTransactionsResponse.body.transactions[0].id;

		const getTransactionResponse = await request(app.server)
			.get(`/transactions/${transactionId}`)
			.set("Cookie", cookies)
			.expect(200);

		expect(getTransactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: "New transaction",
				amount: 5000,
			}),
		);
	});

	test("get the summary", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "Credit transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie");
		if (!cookies) throw new Error("no cookies were found");

		await request(app.server)
			.post("/transactions")
			.set("Cookie", cookies)
			.send({
				title: "Debit transaction",
				amount: 2000,
				type: "debit",
			});

		const summaryResponse = await request(app.server)
			.get("/transactions/summary")
			.set("Cookie", cookies)
			.expect(200);

		expect(summaryResponse.body.summary).toEqual({
			amount: 3000,
		});
	});
});
