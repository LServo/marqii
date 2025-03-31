import type { Prisma } from "@prisma/client";
import type { SectionsEntityOutput } from "../../domain/Sections.entity.js";

export namespace CreateSections {
	export interface Input {
		sections: Prisma.SectionsCreateManyInput[];
	}

	export type Output = undefined;
}
