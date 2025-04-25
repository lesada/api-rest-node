import { type Knex, knex as setupKnex } from "knex";
import { join } from "node:path";
import { env } from "./env";

export const config: Knex.Config = {
	client: "sqlite3",
	connection: {
		filename: join(process.cwd(), env.DATABASE_URL),
	},
	migrations: {
		directory: join(process.cwd(), "database", "migrations"),
	},
	useNullAsDefault: true,
};

export const knex = setupKnex(config);
