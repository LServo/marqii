import { Controller, created } from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserCreateUseCase } from "./user-create-use-case.js";
import type { DTOUserCreateController } from "./user-create.types.js";

class UserCreateController extends Controller {
	async handle(
		request: DTOUserCreateController.Input,
	): Promise<DTOUserCreateController.Output> {
		SaveLogs.ControllerTitle("UserCreateController (execute)");

		await this.validateInput(request);
		const { name, email, birthDate } = request;

		const userCreateUseCase = container.resolve(UserCreateUseCase);

		const response = await userCreateUseCase.execute({
			name,
			email,
			birthDate,
		});

		return created(response);
	}

	private async validateInput(
		input: Omit<DTOUserCreateController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		const schema = z.object({
			name: z
				.string()
				.min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
			email: z.string().email({ message: "Email inválido" }),
			birthDate: z.string().datetime(),
		});

		await zodValidation(input, schema);
	}
}

export { UserCreateController };
