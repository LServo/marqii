import type { RequestInput } from "@/shared/application/general-controller.js";
import type { HttpResponse } from "@/shared/application/http-responses.js";
import type { UUID } from "@/shared/main/@types/index.js";
import type { ItemsEntityInput } from "../../infra/domain/Items.entity.js";
import type {
	MenuEntityFull,
	MenuEntityInput,
} from "../../infra/domain/Menu.entity.js";
import type { ModifiersEntityInput } from "../../infra/domain/Modifiers.entity.js";
import type { SectionsEntityInput } from "../../infra/domain/Sections.entity.js";

export namespace DTOCreateMenuOrchestrator {
	export interface ControllerRequest {
		menuId: UUID;
		name: string;
		description: string;
		accountId: UUID;
		accountIntegrationId: UUID;
		sections: {
			name: string;
			description?: string;
			items: {
				name: string;
				modifiers?: {
					name: string;
					price: number;
				}[];
				price: number;
				description?: string;
				image?: string;
			}[];
		}[];
	}

	export interface MappedRequest {
		MenuData: MenuEntityInput;
		SectionsData: SectionsEntityInput[];
		ItemsData: ItemsEntityInput[];
		ModifiersData: ModifiersEntityInput[];
	}

	export interface Input extends RequestInput, ControllerRequest {}

	type ControllerResponse = MenuEntityFull;
	export interface Output extends HttpResponse<ControllerResponse> {}
}
