import type { UUID } from "@/shared/main/@types/index.js";
import type { Sections } from "@prisma/client";
import type { ItemsEntityFull } from "./Items.entity.js";

class SectionsEntity implements Sections {
	id: UUID;
	menu_id: UUID;

	name: string;
	description: string;
}

class SectionsEntityInput implements Partial<SectionsEntity> {
	id: UUID;

	name: string;
	description: string;
}

class SectionsEntityOutput implements SectionsEntity {
	id: UUID;
	menu_id: UUID;

	name: string;
	description: string;
}

class SectionsEntityFull extends SectionsEntityOutput {
	Items: ItemsEntityFull;
}

export {
	SectionsEntity,
	SectionsEntityInput,
	SectionsEntityOutput,
	SectionsEntityFull,
};
