import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { IModifiersRepository } from "../../infra/repositories/modifiers-repository/modifiers-repository-interface.js";
import type { CreateModifiers } from "../../infra/repositories/modifiers-repository/modifiers-repository.types.js";
import type { DTOCreateModifiersUseCase } from "./create-modifiers.types.js";

@injectable()
class CreateModifiersUseCase {
	constructor(
		@inject("ModifiersRepository")
		private modifiersRepository: IModifiersRepository,
	) {}

	async execute({
		modifiers,
	}: DTOCreateModifiersUseCase.Input): Promise<DTOCreateModifiersUseCase.Output> {
		SaveLogs.UseCaseTitle("CreateModifiersUseCase (execute");

		const mappedItems = modifiers.map((modifier) => {
			return {
				name: modifier.name,
				price: modifier.price,
				item_id: modifier.item_id,
			};
		}) satisfies CreateModifiers.Input["modifiers"];

		await this.modifiersRepository.createModifier({
			modifiers: mappedItems,
		});
	}
}

export { CreateModifiersUseCase };
