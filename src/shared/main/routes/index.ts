import { Router } from "express";

import { v1AuthRoutes } from "./accounts/auth.routes.js";
import { v1UsersRoutes } from "./accounts/users.routes.js";

const developmentRoutes = Router();

enum RouteTags {
	users = "/users",
	auth = "/auth",
}

//accounts
developmentRoutes.use(RouteTags.users, v1UsersRoutes);
developmentRoutes.use(RouteTags.auth, v1AuthRoutes);

export { developmentRoutes, RouteTags };
