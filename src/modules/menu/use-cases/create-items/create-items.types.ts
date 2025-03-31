import type {
	ItemsEntityInput,
	ItemsEntityOutput,
} from "../../infra/domain/Items.entity.js";

export namespace DTOCreateItemsUseCase {
	export interface Input {
		items: ItemsEntityInput[];
	}

	export interface Output extends ItemsEntityOutput {}
}
