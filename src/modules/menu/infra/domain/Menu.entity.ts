import type { UUID } from "@/shared/main/@types/index.js";
import type { Menu } from "@prisma/client";
import type { SectionsEntityFull } from "./Sections.entity.js";

class MenuEntity implements Menu {
	id: UUID;
	accountId: UUID;
	accountIntegrationId: UUID;

	name: string;
	description: string;
}

class MenuEntityInput implements Partial<MenuEntity> {
	name: string;
	description: string;
}

class MenuEntityOutput implements MenuEntity {
	id: UUID;
	accountId: UUID;
	accountIntegrationId: UUID;

	name: string;
	description: string;
}

class MenuEntityFull extends MenuEntityOutput {
	Sections: SectionsEntityFull[];
}

export { MenuEntity, MenuEntityInput, MenuEntityOutput, MenuEntityFull };
