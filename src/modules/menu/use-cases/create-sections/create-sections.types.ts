import type { UUID } from "@/shared/main/@types/index.js";
import type {
	SectionsEntityInput,
	SectionsEntityOutput,
} from "../../infra/domain/Sections.entity.js";

export namespace DTOCreateSectionsUseCase {
	export interface Input {
		sections: SectionsEntityInput[];
		menu_id: UUID;
	}

	export type Output = undefined;
}
