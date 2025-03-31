import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { IMenusRepository } from "../../infra/repositories/menus-repository/menus-repository-interface.js";
import type { DTOCreateMenuUseCase } from "./create-menu.types.js";

@injectable()
class CreateMenuUseCase {
	constructor(
		@inject("MenusRepository")
		private menusRepository: IMenusRepository,
	) {}

	async execute({
		name,
		description,
	}: DTOCreateMenuUseCase.Input): Promise<DTOCreateMenuUseCase.Output> {
		SaveLogs.UseCaseTitle("CreateMenuUseCase (execute");

		const createdMenu = this.menusRepository.createMenu({ name, description });

		return createdMenu;
	}
}

export { CreateMenuUseCase };
