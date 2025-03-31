import { container } from "tsyringe";

import {
	Controller,
	type HttpResponse,
	noContent,
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";

import { zodValidation } from "@/utils/zod-validation.js";
import { z } from "zod";
import { AuthenticateClearUseCase } from "./authenticate-clear-use-case.js";
import type { DTOAuthenticateClearController } from "./authenticate-clear.types.js";

class AuthenticateClearController extends Controller {
	async handle(
		request: DTOAuthenticateClearController.Input,
	): Promise<HttpResponse> {
		SaveLogs.ControllerTitle("AuthenticateClearController (handle)");

		await this.validateInput(request.userContext);
		const { accessToken } = request;

		const authenticateClearUseCase = container.resolve(
			AuthenticateClearUseCase,
		);

		await authenticateClearUseCase.execute({
			accessToken,
		});

		return noContent();
	}

	private async validateInput(
		input: Omit<DTOAuthenticateClearController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		console.log("input:", input);
		const schema = z.object({
			accessToken: z.string().jwt(),
		});

		await zodValidation(input, schema);
	}
}

export { AuthenticateClearController };
