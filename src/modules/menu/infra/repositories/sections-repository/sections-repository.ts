import { TransactionManager } from "@/shared/infra/database/transaction-manager.js";
import type { ISectionsRepository } from "./sections-repository-interface.js";
import type { CreateSections } from "./sections-repository.types.js";

class SectionsRepository implements ISectionsRepository {
	async createSections({
		sections,
		transactionId,
	}: CreateSections.Input): Promise<CreateSections.Output> {
		const prismaClient = TransactionManager.getClient(transactionId);

		await prismaClient.sections.createMany({
			data: sections,
		});
	}
}

export { SectionsRepository };
