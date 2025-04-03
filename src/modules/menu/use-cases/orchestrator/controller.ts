import { Controller } from "@/shared/application/general-controller.js";
import { created } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { TransactionManager } from "@/shared/infra/database/transaction-manager.js";
import { inject, injectable } from "tsyringe";
import { CreateItemsUseCase } from "../create-items/create-items-use-case.js";
import { CreateMenuUseCase } from "../create-menu/create-menu-use-case.js";
import { CreateModifiersUseCase } from "../create-modifiers/create-modifiers-use-case.js";
import { CreateSectionsUseCase } from "../create-sections/create-sections-use-case.js";
import { ReadFullMenuUseCase } from "../read-full-menu/read-full-menu-use-case.js";
import type { DTOCreateMenuOrchestrator } from "./controller.types.js";
import { MapperService } from "./mapper.js";
import { ValidatorService } from "./validator.js";

@injectable()
export class CreateMenuOrchestrator extends Controller {
	constructor(
		@inject(CreateMenuUseCase)
		private createMenuUseCase: CreateMenuUseCase,

		@inject(CreateSectionsUseCase)
		private createSectionsUseCase: CreateSectionsUseCase,

		@inject(CreateItemsUseCase)
		private createItemsUseCase: CreateItemsUseCase,

		@inject(CreateModifiersUseCase)
		private createModifiersUseCase: CreateModifiersUseCase,

		@inject(ReadFullMenuUseCase)
		private readFullMenuUseCase: ReadFullMenuUseCase,

		@inject(MapperService)
		private mapperService: MapperService,

		@inject(ValidatorService)
		private validatorService: ValidatorService,
	) {
		super();
	}

	async handle(
		request: DTOCreateMenuOrchestrator.Input,
	): Promise<DTOCreateMenuOrchestrator.Output> {
		SaveLogs.ControllerTitle("CreateMenuOrchestrator (handle)");

		await this.validatorService.validateInput(request);
		const mappedRequest = this.mapperService.requestMapper(request);

		const fullMenu = await TransactionManager.start(async (transactionId) => {
			const { MenuData, SectionsData, ItemsData, ModifiersData } =
				mappedRequest;

			const createdMenu = await this.createMenuUseCase.execute({
				...MenuData,
				transactionId,
			});

			await this.createSectionsUseCase.execute({
				sections: SectionsData,
				menu_id: createdMenu.id,
				transactionId,
			});

			await this.createItemsUseCase.execute({
				items: ItemsData,
				transactionId,
			});

			await this.createModifiersUseCase.execute({
				modifiers: ModifiersData,
				transactionId,
			});

			return this.readFullMenuUseCase.execute({
				id: createdMenu.id,
				transactionId,
			});
		});

		return created(fullMenu);
	}
}
