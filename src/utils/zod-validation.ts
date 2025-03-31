import { InputValidationError } from "@/shared/application/index.js";
import type { z } from "zod";

type ZodSchema = z.ZodObject<
	z.ZodRawShape,
	"strip",
	z.ZodTypeAny,
	{
		[x: string]: unknown;
	},
	{
		[x: string]: unknown;
	}
>;

/**
 * @description Função útil para simplificar validações de schema com o zod, será utilizada nos controllers
 * @operational
 * - Caso exista erro de validação, retornara um erro de input com status 422
 * @param input Input recebido
 * @param schema Input esperado
 * @returns Sem retorno
 */
export async function zodValidation(
	input: Record<string, unknown>,
	schema: ZodSchema,
): Promise<void> {
	const isValid = await schema.safeParseAsync(input);

	if (!isValid.success)
		throw new InputValidationError({
			message: "",
			detailed: isValid.error.flatten()?.fieldErrors,
		});
}
