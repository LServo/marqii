import type { ModifiersEntityInput } from "../../infra/domain/Modifiers.entity.js";

export namespace DTOCreateModifiersUseCase {
	export interface Input {
		modifiers: ModifiersEntityInput[];
		transactionId: string;
	}

	export type Output = undefined;
}
