import type { Prisma } from "@prisma/client";

export namespace CreateModifiers {
	export interface Input {
		modifiers: Prisma.ModifiersCreateManyInput[];
		transactionId: string;
	}

	export type Output = undefined;
}
