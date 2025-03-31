import type {
	MenuEntity,
	MenuEntityFull,
} from "../../infra/domain/Menu.entity.js";

export namespace DTOReadFullMenuUseCase {
	type MenuId = Pick<MenuEntity, "id">;
	export interface Input extends MenuId {}

	export interface Output extends MenuEntityFull {}
}
