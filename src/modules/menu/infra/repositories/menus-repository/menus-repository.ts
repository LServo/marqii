import { TransactionManager } from "@/shared/infra/database/transaction-manager.js";
import type { UUID } from "@/shared/main/@types/index.js";
import type { IMenusRepository } from "./menus-repository-interface.js";
import type { CreateMenu, GetFullMenu } from "./menus-repository.types.js";

class MenusRepository implements IMenusRepository {
	async createMenu({
		name,
		description,
		transactionId,
	}: CreateMenu.Input): Promise<CreateMenu.Output> {
		const prismaClient = TransactionManager.getClient(transactionId);

		const createdMenu = await prismaClient.menu.create({
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

	async getFullMenu({
		id,
		transactionId,
	}: GetFullMenu.Input): Promise<GetFullMenu.Output> {
		const prismaClient = TransactionManager.getClient(transactionId);

		const fullMenu = await prismaClient.menu.findFirst({
			where: { id },
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

		const output = fullMenu as GetFullMenu.Output;

		return output;
	}
}

export { MenusRepository };
