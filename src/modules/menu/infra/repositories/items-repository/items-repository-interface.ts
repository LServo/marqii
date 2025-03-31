import type { CreateItems } from "./items-repository.types.js";

interface IItemsRepository {
	createItems({ items }: CreateItems.Input): Promise<CreateItems.Output>;
}

export type { IItemsRepository };
