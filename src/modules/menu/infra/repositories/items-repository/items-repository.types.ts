import type { Prisma } from "@prisma/client";

export namespace CreateItems {
	export interface Input {
		items: Prisma.ItemsCreateManyInput[];
		transactionId: string;
	}

	export type Output = undefined;
}
