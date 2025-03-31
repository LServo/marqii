import { Controller } from "@/shared/application/general-controller.js";
import { noContent } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserUpdateUseCase } from "./user-update-use-case.js";
import type { DTOUserUpdateController } from "./user-update.types.js";

class UserUpdateController extends Controller {
	override async handle(
		request: DTOUserUpdateController.Input,
	): Promise<DTOUserUpdateController.Output> {
		SaveLogs.ControllerTitle("UserUpdateController (handle)");

		await this.validateInput(request);

		const userUpdateUseCase = container.resolve(UserUpdateUseCase);

		await userUpdateUseCase.execute({
			id: request.id,
			data: {
				name: request.name,
				email: request.email,
				birthDate: request.birthDate,
			},
		});

		return noContent();
	}

	private async validateInput(
		input: Omit<DTOUserUpdateController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		const schema = z.object({
			id: z.string().uuid(),
			name: z
				.string()
				.min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
			email: z.string().email({ message: "Email inválido" }),
			birthDate: z.string().datetime(),
		});

		await zodValidation(input, schema);
	}
}

export { UserUpdateController };
