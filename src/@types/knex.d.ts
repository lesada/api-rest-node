import type { Knex } from "knex";

type _Knex = Knex;

declare module "knex/types/tables" {
	export interface Tables {
		transactions: {
			id: string;
			title: string;
			amount: number;
			created_at: string;
			session_id?: string;
		};
	}
}
