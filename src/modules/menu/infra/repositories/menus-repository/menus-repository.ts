import { prisma } from "@/shared/infra/database/prisma-client.js";
import type { UUID } from "@/shared/main/@types/index.js";
import type { IMenusRepository } from "./menus-repository-interface.js";
import type { CreateMenu, GetFullMenu } from "./menus-repository.types.js";

class MenusRepository implements IMenusRepository {
	async createMenu({
		name,
		description,
	}: CreateMenu.Input): Promise<CreateMenu.Output> {
		const createdMenu = await prisma.menu.create({
			data: {
				name,
				description,
			},
		});

		const output = {
			...createdMenu,
			id: createdMenu.id as UUID,
			accountId: createdMenu.accountId as UUID,
			accountIntegrationId: createdMenu.accountIntegrationId as UUID,
		} satisfies CreateMenu.Output;

		return output;
	}

	async getFullMenu({ id }: GetFullMenu.Input): Promise<GetFullMenu.Output> {
		const fullMenu = await prisma.menu.findFirst({
			where: {
				id: id,
			},
			include: {
				Sections: {
					include: {
						Items: {
							include: {
								Modifiers: true,
							},
						},
					},
				},
			},
		});

		return fullMenu;
	}
}

export { MenusRepository };
