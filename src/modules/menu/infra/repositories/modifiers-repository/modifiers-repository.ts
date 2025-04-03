import { TransactionManager } from "@/shared/infra/database/transaction-manager.js";
import type { IModifiersRepository } from "./modifiers-repository-interface.js";
import type { CreateModifiers } from "./modifiers-repository.types.js";

class ModifiersRepository implements IModifiersRepository {
	async createModifier({
		modifiers,
		transactionId,
	}: CreateModifiers.Input): Promise<CreateModifiers.Output> {
		const prismaClient = TransactionManager.getClient(transactionId);

		await prismaClient.modifiers.createMany({
			data: modifiers,
		});
	}
}

export { ModifiersRepository };
