import type { UUID } from "@/shared/main/@types/index.js";
import type { Items, Menu } from "@prisma/client";
import type { ModifiersEntityOutput } from "./Modifiers.entity.js";

class ItemsEntity implements Items {
	id: UUID;
	section_id: UUID;

	name: string;
	price: number;
	image: string;
	description: string;
}

class ItemsEntityInput implements Partial<ItemsEntity> {
	id: UUID;
	section_id: UUID;

	name: string;
	price: number;
	image?: string;
	description?: string;
}

class ItemsEntityOutput implements ItemsEntity {
	id: UUID;
	section_id: UUID;

	name: string;
	price: number;
	image: string;
	description: string;
}

class ItemsEntityFull extends ItemsEntityOutput {
	Modifiers: ModifiersEntityOutput[];
}

export { ItemsEntity, ItemsEntityInput, ItemsEntityOutput, ItemsEntityFull };
