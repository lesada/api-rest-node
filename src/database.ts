import { type Knex, knex as setupKnex } from "knex";
import { join } from "node:path";
import { env } from "./env";

export const config: Knex.Config = {
	client: env.DATABASE_CLIENT,
	connection:
		env.DATABASE_CLIENT === "sqlite"
			? {
					filename: env.DATABASE_URL,
				}
			: env.DATABASE_URL,

	migrations: {
		directory: join(process.cwd(), "database", "migrations"),
	},
	useNullAsDefault: true,
};

export const knex = setupKnex(config);
