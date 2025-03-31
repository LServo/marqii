import { notFound } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserDeleteUseCase } from "./user-delete.types.js";

@injectable()
class UserDeleteUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
	) {}

	async execute({
		id,
	}: DTOUserDeleteUseCase.Input): Promise<DTOUserDeleteUseCase.Output> {
		SaveLogs.UseCaseTitle("UserDeleteUseCase (execute)");

		const userExists = await this.usersRepository.readUser({
			id,
		});

		if (!userExists) throw notFound({ error_code: "USER_NOT_FOUND" });

		await this.cognitoProvider.disableUser({ username: userExists.email });

		await this.usersRepository.deleteUser({ id });
	}
}

export { UserDeleteUseCase };
