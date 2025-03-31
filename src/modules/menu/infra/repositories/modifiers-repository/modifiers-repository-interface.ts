import type { CreateModifiers } from "./modifiers-repository.types.js";

interface IModifiersRepository {
	createModifier({
		modifiers,
	}: CreateModifiers.Input): Promise<CreateModifiers.Output>;
}

export type { IModifiersRepository };
