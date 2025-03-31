import type { Prisma } from "@prisma/client";

export namespace CreateModifiers {
	export interface Input {
		modifiers: Prisma.ModifiersCreateManyInput[];
	}

	export type Output = undefined;
}
