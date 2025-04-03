import type {
	MenuEntity,
	MenuEntityFull,
	MenuEntityInput,
	MenuEntityOutput,
} from "../../domain/Menu.entity.js";

export namespace CreateMenu {
	export interface Input extends MenuEntityInput {
		transactionId: string;
	}

	export interface Output extends MenuEntityOutput {}
}

export namespace GetFullMenu {
	type MenuId = Pick<MenuEntity, "id">;
	export interface Input extends MenuId {
		transactionId: string;
	}

	export interface Output extends MenuEntityFull {}
}
