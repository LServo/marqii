import { notFound } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserDeleteUseCase } from "./user-delete.types.js";

@injectable()
class UserDeleteUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
	) {}

	async execute({
		id,
	}: DTOUserDeleteUseCase.Input): Promise<DTOUserDeleteUseCase.Output> {
		SaveLogs.UseCaseTitle("UserDeleteUseCase (execute)");

		const userExists = await this.usersRepository.readUser({
			id,
		});

		if (!userExists) throw notFound({ error_code: "USER_NOT_FOUND" });

		await this.usersRepository.deleteUser({ id });
	}
}

export { UserDeleteUseCase };
