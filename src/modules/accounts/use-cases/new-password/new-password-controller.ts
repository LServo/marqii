import { container } from "tsyringe";

import {
	Controller,
	type HttpResponse,
	noContent,
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";

import { zodValidation } from "@/utils/zod-validation.js";
import { z } from "zod";
import { NewPasswordUseCase } from "./new-password-use-case.js";
import type { DTONewPasswordController } from "./new-password.types.js";

class NewPasswordController extends Controller {
	async handle(request: DTONewPasswordController.Input): Promise<HttpResponse> {
		SaveLogs.ControllerTitle("NewPasswordController (handle)");

		await this.validateInput(request);
		const { email, password, newPassword } = request;

		const newPasswordUseCase = container.resolve(NewPasswordUseCase);

		await newPasswordUseCase.execute({ email, password, newPassword });

		return noContent();
	}

	private async validateInput(
		input: Omit<DTONewPasswordController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		const schema = z.object({
			email: z.string().email({ message: "Email inválido" }),
			password: z.string(),
			newPassword: z.string(),
		});

		await zodValidation(input, schema);
	}
}

export { NewPasswordController };
