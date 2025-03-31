import { container } from "tsyringe";

import {
	Controller,
	type HttpResponse,
	ok,
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";

import { zodValidation } from "@/utils/zod-validation.js";
import { z } from "zod";
import { AuthenticateUseCase } from "./authenticate-use-case.js";
import type { DTOAuthenticateController } from "./authenticate.types.js";

class AuthenticateController extends Controller {
	async handle(
		request: DTOAuthenticateController.Input,
	): Promise<HttpResponse> {
		SaveLogs.ControllerTitle("AuthenticateController (handle)");

		await this.validateInput(request);
		const { email, password } = request;

		const authUseCase = container.resolve(AuthenticateUseCase);
		const newToken = await authUseCase.execute({
			email,
			password,
		});

		const output: DTOAuthenticateController.Output = { ...newToken };

		return ok(output);
	}

	private async validateInput(
		input: Omit<DTOAuthenticateController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		const schema = z.object({
			email: z.string().email({ message: "Email inválido" }),
			password: z.string(),
		});

		await zodValidation(input, schema);
	}
}

export { AuthenticateController };
