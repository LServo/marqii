import type { Prisma } from "@prisma/client";

export namespace CreateSections {
	export interface Input {
		sections: Prisma.SectionsCreateManyInput[];
		transactionId: string;
	}

	export type Output = undefined;
}
