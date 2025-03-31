import { Router } from "express";

import { v1AuthRoutes } from "./accounts/auth.routes.js";
import { v1UsersRoutes } from "./accounts/users.routes.js";
import { v1MenuRoutes } from "./menu/menu.routes.js";

const developmentRoutes = Router();

enum RouteTags {
	users = "/users",
	auth = "/auth",
	menu = "/menu",
}

//accounts
developmentRoutes.use(RouteTags.users, v1UsersRoutes);
developmentRoutes.use(RouteTags.auth, v1AuthRoutes);
developmentRoutes.use(RouteTags.menu, v1MenuRoutes);

export { developmentRoutes, RouteTags };
