import { type Knex, knex as setupKnex } from "knex";

export const config: { [key: string]: Knex.Config } = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./tmp/app.db",
		},
		migrations: {
			directory: "./database/migrations",
		},
		useNullAsDefault: true,
	},
};

export const knex = setupKnex(config.development);
