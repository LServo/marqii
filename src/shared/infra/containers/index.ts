import type { IUsersRepository } from "@/modules/accounts/infra/repository/users-repository/users-repository.interface.js";
import { PrismaUsersRepository } from "@/modules/accounts/infra/repository/users-repository/users-repository.js";
import { container, delay } from "tsyringe";

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	delay(() => PrismaUsersRepository),
);
