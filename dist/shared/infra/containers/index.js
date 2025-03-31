import { PrismaUsersRepository } from "../../../modules/accounts/infra/repository/users-repository/users-repository.js";
import { container, delay } from "tsyringe";
import "./providers";
container.registerSingleton("UsersRepository", delay(() => PrismaUsersRepository));
//# sourceMappingURL=index.js.map