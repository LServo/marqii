import { TransactionManager } from "@/shared/infra/database/transaction-manager.js";
import type { IItemsRepository } from "./items-repository-interface.js";
import type { CreateItems } from "./items-repository.types.js";

class ItemsRepository implements IItemsRepository {
	async createItems({
		items,
		transactionId,
	}: CreateItems.Input): Promise<CreateItems.Output> {
		const prismaClient = TransactionManager.getClient(transactionId);

		await prismaClient.items.createMany({
			data: items,
		});
	}
}

export { ItemsRepository };
