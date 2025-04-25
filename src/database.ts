import { type Knex, knex as setupKnex } from "knex";

export const config: Knex.Config = {
	client: "sqlite3",
	connection: {
		filename: "./database/app.db",
	},
	migrations: {
		directory: "./database/migrations",
	},
	useNullAsDefault: true,
};

export const knex = setupKnex(config);
