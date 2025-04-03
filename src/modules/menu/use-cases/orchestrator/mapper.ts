import { SaveLogs } from "@/shared/application/save-logs.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import type { DTOCreateMenuOrchestrator } from "./controller.types.js";

@injectable()
class MapperService {
	requestMapper(
		input: DTOCreateMenuOrchestrator.Input,
	): DTOCreateMenuOrchestrator.MappedRequest {
		SaveLogs.ServiceTitle("MapperService (requestMapper)");

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
				} satisfies DTOCreateMenuOrchestrator.MappedRequest,
			);

		return {
			MenuData,
			SectionsData,
			ItemsData,
			ModifiersData,
		};
	}

	private sectionMapper(
		section: DTOCreateMenuOrchestrator.Input["sections"][number],
	) {
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
		item: DTOCreateMenuOrchestrator.Input["sections"][number]["items"][number],
		sectionId: UUID,
	) {
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

export { MapperService };
