import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { IMenusRepository } from "../../infra/repositories/menus-repository/menus-repository-interface.js";
import type { DTOReadFullMenuUseCase } from "./read-full-menu.types.js";

@injectable()
class ReadFullMenuUseCase {
	constructor(
		@inject("MenusRepository")
		private menusRepository: IMenusRepository,
	) {}

	async execute({
		id,
		transactionId,
	}: DTOReadFullMenuUseCase.Input): Promise<DTOReadFullMenuUseCase.Output> {
		SaveLogs.UseCaseTitle("ReadFullMenuUseCase (execute");

		const fullMenu = this.menusRepository.getFullMenu({
			id,
			transactionId,
		});

		return fullMenu;
	}
}

export { ReadFullMenuUseCase };
