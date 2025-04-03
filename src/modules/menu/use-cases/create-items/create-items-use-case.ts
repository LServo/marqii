import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { IItemsRepository } from "../../infra/repositories/items-repository/items-repository-interface.js";
import type { CreateItems } from "../../infra/repositories/items-repository/items-repository.types.js";
import type { DTOCreateItemsUseCase } from "./create-items.types.js";

@injectable()
class CreateItemsUseCase {
	constructor(
		@inject("ItemsRepository")
		private itemsRepository: IItemsRepository,
	) {}

	async execute({
		items,
		transactionId,
	}: DTOCreateItemsUseCase.Input): Promise<DTOCreateItemsUseCase.Output> {
		SaveLogs.UseCaseTitle("CreateItemsUseCase (execute");

		const mappedItems = items.map((item) => {
			return {
				id: item.id,
				name: item.name,
				price: item.price,
				image: item.image,
				description: item.description,
				section_id: item.section_id,
			};
		}) satisfies CreateItems.Input["items"];

		const createdItem = this.itemsRepository.createItems({
			items: mappedItems,
			transactionId,
		});

		return createdItem;
	}
}

export { CreateItemsUseCase };
