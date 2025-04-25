import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, expect, test } from "vitest";
import { app } from "../src/app";

describe("Transactions routes", () => {
	beforeAll(async () => {
		await app.ready();
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
});
