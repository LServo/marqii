import type { CreateMenu, GetFullMenu } from "./menus-repository.types.js";

interface IMenusRepository {
	createMenu({
		name,
		description,
	}: CreateMenu.Input): Promise<CreateMenu.Output>;

	getFullMenu({
		id,
		transactionId,
	}: GetFullMenu.Input): Promise<GetFullMenu.Output>;
}

export type { IMenusRepository };
