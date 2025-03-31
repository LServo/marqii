import { conflict } from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserCreateUseCase } from "./user-create.types.js";

@injectable()
class UserCreateUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
	) {}

	async execute({
		name,
		email,
		birthDate,
	}: DTOUserCreateUseCase.Input): Promise<DTOUserCreateUseCase.Output> {
		SaveLogs.UseCaseTitle("UserCreateUseCase (execute)");

		/**
		 * 1. Validar se já existe usuário com email
		 * 2. Criar usuário no Cognito
		 * 3. Criar usuário no Banco de Dados
		 * 4. Se houver algum problema, remover ambos antes de retornar erro ***
		 */

		const userAlreadyExists = await this.usersRepository.getUserByEmail({
			email,
		});

		if (userAlreadyExists) throw conflict({ error_code: "USER_CONFLICT" });

		const cognitoUser = await this.cognitoProvider.adminCreateUser({
			username: email,
			userAttributes: [
				{
					Name: "email",
					Value: email,
				},
			],
		});
		console.log("cognitoUser:", cognitoUser);

		const createdUser = await this.usersRepository.createUser({
			name,
			email,
			birthDate,
			idProvider: cognitoUser.username as UUID,
		});

		const output = {
			...createdUser,
		} satisfies DTOUserCreateUseCase.Output;

		return output;
	}
}

export { UserCreateUseCase };
