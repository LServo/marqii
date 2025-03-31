import { notFound } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserUpdateUseCase } from "./user-update.types.js";

@injectable()
class UserUpdateUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
	) {}

	async execute({
		id,
		data,
	}: DTOUserUpdateUseCase.Input): Promise<DTOUserUpdateUseCase.Output> {
		SaveLogs.UseCaseTitle("UserUpdateUseCase (execute)");

		const userExists = await this.usersRepository.readUser({
			id,
		});

		if (!userExists) throw notFound({ error_code: "USER_NOT_FOUND" });

		await this.usersRepository.updateUser({
			id,
			data,
		});

		if (data.email)
			await this.cognitoProvider.adminUpdateUserAttributes({
				username: userExists.email,
				userAttributes: [{ Name: "email", Value: data.email }],
			});
	}
}

export { UserUpdateUseCase };
