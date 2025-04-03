import type {
	MenuEntity,
	MenuEntityInput,
} from "../../infra/domain/Menu.entity.js";

export namespace DTOCreateMenuUseCase {
	export interface Input extends MenuEntityInput {
		transactionId: string;
	}

	export interface Output extends MenuEntity {}
}
