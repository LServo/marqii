import { prisma } from "@/shared/infra/database/prisma-client.js";
import type { UUID } from "@/shared/main/@types/index.js";
import type { ISectionsRepository } from "./sections-repository-interface.js";
import type { CreateSections } from "./sections-repository.types.js";

class SectionsRepository implements ISectionsRepository {
	async createSections({
		sections,
	}: CreateSections.Input): Promise<CreateSections.Output> {
		await prisma.sections.createMany({
			data: sections,
		});
	}
}
export { SectionsRepository };
