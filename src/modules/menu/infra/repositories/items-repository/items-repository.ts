import { prisma } from "@/shared/infra/database/prisma-client.js";
import type { IItemsRepository } from "./items-repository-interface.js";
import type { CreateItems } from "./items-repository.types.js";

class ItemsRepository implements IItemsRepository {
	async createItems({ items }: CreateItems.Input): Promise<CreateItems.Output> {
		await prisma.items.createMany({
			data: items,
		});
	}
}

export { ItemsRepository };
