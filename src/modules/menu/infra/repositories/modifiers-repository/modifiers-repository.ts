import { prisma } from "@/shared/infra/database/prisma-client.js";
import type { IModifiersRepository } from "./modifiers-repository-interface.js";
import type { CreateModifiers } from "./modifiers-repository.types.js";

class ModifiersRepository implements IModifiersRepository {
	async createModifier({
		modifiers,
	}: CreateModifiers.Input): Promise<CreateModifiers.Output> {
		await prisma.modifiers.createMany({ data: modifiers });
	}
}

export { ModifiersRepository };
