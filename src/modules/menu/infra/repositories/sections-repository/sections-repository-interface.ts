import type { CreateSections } from "./sections-repository.types.js";

interface ISectionsRepository {
	createSections({
		sections,
	}: CreateSections.Input): Promise<CreateSections.Output>;
}

export type { ISectionsRepository };
