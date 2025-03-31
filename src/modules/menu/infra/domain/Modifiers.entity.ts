import type { UUID } from "@/shared/main/@types/index.js";
import type { Modifiers } from "@prisma/client";

class ModifiersEntity implements Modifiers {
	id: UUID;
	item_id: UUID;

	name: string;
	price: number;
}

class ModifiersEntityInput implements Partial<ModifiersEntity> {
	item_id: UUID;

	name: string;
	price: number;
}

class ModifiersEntityOutput implements ModifiersEntity {
	id: UUID;
	item_id: UUID;

	name: string;
	price: number;
}

export { ModifiersEntity, ModifiersEntityInput, ModifiersEntityOutput };
