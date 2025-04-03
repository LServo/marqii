import { SaveLogs } from "@/shared/application/save-logs.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { injectable } from "tsyringe";
import { z } from "zod";
import type { DTOCreateMenuOrchestrator } from "./controller.types.js";

@injectable()
class ValidatorService {
	async validateInput(
		input: Omit<DTOCreateMenuOrchestrator.Input, "userContext">,
	) {
		SaveLogs.ServiceTitle("ValidatorService (validateInput)");

		const MenuSchemas = {
			Modifier: z.object({
				name: z.string().min(1, "Nome do modificador é obrigatório"),
				price: z.number(),
			}),

			Item: z.object({
				name: z.string().min(1, "Nome do item é obrigatório"),
				price: z.number().min(0, "Preço deve ser maior ou igual a zero"),
				description: z.string().optional(),
				image: z.string().url("URL de imagem inválida").optional(),
				modifiers: z.array(z.lazy(() => MenuSchemas.Modifier)).optional(),
			}),

			Section: z.object({
				name: z.string().min(1, "Nome da seção é obrigatório"),
				description: z.string(),
				items: z.array(z.lazy(() => MenuSchemas.Item)),
			}),

			Menu: z.object({
				menuId: z.string().uuid("ID de menu inválido"),
				name: z.string().min(1, "Nome do menu é obrigatório"),
				description: z.string(),
				accountId: z.string().uuid("ID de conta inválido"),
				accountIntegrationId: z.string().uuid("ID de integração inválido"),
				sections: z.array(z.lazy(() => MenuSchemas.Section)),
			}),
		};

		await zodValidation(input, MenuSchemas.Menu);
	}
}

export { ValidatorService };
