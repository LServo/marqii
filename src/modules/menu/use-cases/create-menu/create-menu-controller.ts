import { Controller } from "@/shared/application/general-controller.js";
import { created } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { container } from "tsyringe";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { CreateItemsUseCase } from "../create-items/create-items-use-case.js";
import { CreateModifiersUseCase } from "../create-modifiers/create-modifiers-use-case.js";
import { CreateSectionsUseCase } from "../create-sections/create-sections-use-case.js";
import { ReadFullMenuUseCase } from "../read-full-menu/read-full-menu-use-case.js";
import { CreateMenuUseCase } from "./create-menu-use-case.js";
import type { DTOCreateMenuController } from "./create-menu.types.js";

class CreateMenuController extends Controller {
	async handle(
		request: DTOCreateMenuController.Input,
	): Promise<DTOCreateMenuController.Output> {
		SaveLogs.ControllerTitle("CreateMenuController (handle)");

		await this.validateInput(request);
		const { MenuData, SectionsData, ItemsData, ModifiersData } =
			this.requestMapper(request);

		const createMenuUseCase = container.resolve(CreateMenuUseCase);
		const createSectionUseCase = container.resolve(CreateSectionsUseCase);
		const createItemUseCase = container.resolve(CreateItemsUseCase);
		const createModifiersUseCase = container.resolve(CreateModifiersUseCase);

		const createdMenu = await createMenuUseCase.execute({ ...MenuData });
		await createSectionUseCase.execute({
			sections: SectionsData,
			menu_id: createdMenu.id,
		});
		await createItemUseCase.execute({ items: ItemsData });
		await createModifiersUseCase.execute({
			modifiers: ModifiersData,
		});

		const readFullMenuUseCase = container.resolve(ReadFullMenuUseCase);
		const fullMenu = await readFullMenuUseCase.execute({ id: createdMenu.id });

		const output = {
			...fullMenu,
		} satisfies DTOCreateMenuController.Output["data"];

		return created(output);
	}

	private async validateInput(
		input: Omit<DTOCreateMenuController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("CreateMenuController (validateInput)");

		const ModifierInputSchema = z.object({
			name: z.string(),
			price: z.number(),
		});

		const ItemInputSchema = z.object({
			name: z.string(),
			price: z.number(),
			description: z.string().optional(),
			image: z.string().url().optional(),
			modifiers: z.array(ModifierInputSchema).optional(),
		});

		const SectionInputSchema = z.object({
			name: z.string(),
			description: z.string(),
			items: z.array(ItemInputSchema),
		});

		const MenuInputSchema = z.object({
			menuId: z.string().uuid(),
			name: z.string(),
			description: z.string(),
			accountId: z.string().uuid(),
			accountIntegrationId: z.string().uuid(),
			sections: z.array(SectionInputSchema),
		});

		await zodValidation(input, MenuInputSchema);
	}

	private requestMapper(
		input: DTOCreateMenuController.Input,
	): DTOCreateMenuController.MappedRequest {
		SaveLogs.ControllerTitle("CreateMenuController (requestMapper)");

		const { sections, userContext, headers, ...menuBase } = input;

		const { MenuData, SectionsData, ItemsData, ModifiersData } =
			sections.reduce(
				(acc, section) => {
					const { mappedSection, mappedItems, mappedModifiers } =
						this.sectionMapper(section);

					acc.SectionsData.push(mappedSection);
					acc.ItemsData.push(...mappedItems);
					acc.ModifiersData.push(...mappedModifiers);

					return acc;
				},
				{
					MenuData: {
						...menuBase,
					},
					SectionsData: [],
					ItemsData: [],
					ModifiersData: [],
				} satisfies DTOCreateMenuController.MappedRequest,
			);

		return {
			MenuData,
			SectionsData,
			ItemsData,
			ModifiersData,
		};
	}

	private sectionMapper(
		section: DTOCreateMenuController.Input["sections"][number],
	) {
		SaveLogs.ControllerTitle("CreateMenuController (sectionMapper)");

		const sectionId = uuid() as UUID;

		const itemsWithModifiers = section.items.map((item) =>
			this.itemMapper(item, sectionId),
		);

		return {
			mappedSection: {
				id: sectionId,
				name: section.name,
				description: section.description,
			},
			mappedItems: itemsWithModifiers.flatMap((i) => i.item),
			mappedModifiers: itemsWithModifiers.flatMap((i) => i.modifiers),
		};
	}

	private itemMapper(
		item: DTOCreateMenuController.Input["sections"][number]["items"][number],
		sectionId: UUID,
	) {
		SaveLogs.ControllerTitle("CreateMenuController (itemMapper)");

		const itemId = uuid() as UUID;

		const modifiers =
			item.modifiers?.map((mod) => ({
				item_id: itemId,
				name: mod.name,
				price: mod.price,
			})) ?? [];

		return {
			item: [
				{
					id: itemId,
					section_id: sectionId,
					name: item.name,
					price: item.price,
					description: item.description ?? null,
					image: item.image ?? null,
				},
			],
			modifiers,
		};
	}
}

export { CreateMenuController };
