import { notFound } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserUpdateUseCase } from "./user-update.types.js";

@injectable()
class UserUpdateUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
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

		console.log("data:", data);
		await this.usersRepository.updateUser({
			id,
			data,
		});
	}
}

export { UserUpdateUseCase };
