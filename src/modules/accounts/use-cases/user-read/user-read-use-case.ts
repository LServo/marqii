import { notFound } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../../infra/repository/users-repository/users-repository.interface.js";
import type { DTOUserReadUseCase } from "./user-read.types.js";

@injectable()
class UserReadUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
	) {}

	async execute({
		id,
	}: DTOUserReadUseCase.Input): Promise<DTOUserReadUseCase.Output> {
		SaveLogs.UseCaseTitle("UserReadUseCase (execute)");

		const userExists = await this.usersRepository.readUser({
			id,
		});

		if (!userExists) throw notFound({ error_code: "USER_NOT_FOUND" });

		const output = {
			...userExists,
			id: userExists.id as UUID,
		} satisfies DTOUserReadUseCase.Output;

		return output;
	}
}

export { UserReadUseCase };
