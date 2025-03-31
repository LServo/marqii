import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { ISectionsRepository } from "../../infra/repositories/sections-repository/sections-repository-interface.js";
import type { CreateSections } from "../../infra/repositories/sections-repository/sections-repository.types.js";
import type { DTOCreateSectionsUseCase } from "./create-sections.types.js";

@injectable()
class CreateSectionsUseCase {
	constructor(
		@inject("SectionsRepository")
		private sectionsRepository: ISectionsRepository,
	) {}

	async execute({
		sections,
		menu_id,
	}: DTOCreateSectionsUseCase.Input): Promise<DTOCreateSectionsUseCase.Output> {
		SaveLogs.UseCaseTitle("CreateSectionsUseCase (execute");

		const mappedItems = sections.map((section) => {
			return {
				id: section.id,
				name: section.name,
				description: section.description,
				menu_id,
			};
		}) satisfies CreateSections.Input["sections"];

		await this.sectionsRepository.createSections({
			sections: mappedItems,
		});
	}
}

export { CreateSectionsUseCase };
