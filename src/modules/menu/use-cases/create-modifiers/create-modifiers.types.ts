import type { UUID } from "@/shared/main/@types/index.js";
import type {
	ModifiersEntityInput,
	ModifiersEntityOutput,
} from "../../infra/domain/Modifiers.entity.js";

export namespace DTOCreateModifiersUseCase {
	export interface Input {
		modifiers: ModifiersEntityInput[];
	}

	export type Output = undefined;
}
