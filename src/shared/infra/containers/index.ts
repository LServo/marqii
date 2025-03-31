import type { IUsersRepository } from "@/modules/accounts/infra/repository/users-repository/users-repository.interface.js";
import { PrismaUsersRepository } from "@/modules/accounts/infra/repository/users-repository/users-repository.js";
import { container, delay } from "tsyringe";

import "./providers";
import type { IItemsRepository } from "@/modules/menu/infra/repositories/items-repository/items-repository-interface.js";
import { ItemsRepository } from "@/modules/menu/infra/repositories/items-repository/items-repository.js";
import type { IMenusRepository } from "@/modules/menu/infra/repositories/menus-repository/menus-repository-interface.js";
import { MenusRepository } from "@/modules/menu/infra/repositories/menus-repository/menus-repository.js";
import type { IModifiersRepository } from "@/modules/menu/infra/repositories/modifiers-repository/modifiers-repository-interface.js";
import { ModifiersRepository } from "@/modules/menu/infra/repositories/modifiers-repository/modifiers-repository.js";
import type { ISectionsRepository } from "@/modules/menu/infra/repositories/sections-repository/sections-repository-interface.js";
import { SectionsRepository } from "@/modules/menu/infra/repositories/sections-repository/sections-repository.js";

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	delay(() => PrismaUsersRepository),
);

container.registerSingleton<IItemsRepository>(
	"ItemsRepository",
	delay(() => ItemsRepository),
);

container.registerSingleton<IMenusRepository>(
	"MenusRepository",
	delay(() => MenusRepository),
);

container.registerSingleton<ISectionsRepository>(
	"SectionsRepository",
	delay(() => SectionsRepository),
);

container.registerSingleton<IModifiersRepository>(
	"ModifiersRepository",
	delay(() => ModifiersRepository),
);
