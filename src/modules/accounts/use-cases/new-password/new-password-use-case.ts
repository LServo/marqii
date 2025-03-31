import { inject, injectable } from "tsyringe";

import { badRequest, serverError } from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";

import type { DTONewPasswordUseCase } from "./new-password.types.js";

@injectable()
class NewPasswordUseCase {
	constructor(
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
	) {}

	async execute({
		email,
		password,
		newPassword,
	}: DTONewPasswordUseCase.Input): Promise<void> {
		SaveLogs.UseCaseTitle("NewPasswordUseCase (execute)");

		try {
			await this.cognitoProvider.confirmNewPassword({
				email,
				password,
				newPassword,
			});
		} catch (error) {
			const wrongPassword =
				error?.message === "Incorrect username or password.";

			if (wrongPassword)
				throw badRequest({ error_code: "AUTH_USER_OR_PASSWORD_INVALID" });

			throw serverError({ error });
		}
	}
}

export { NewPasswordUseCase };
