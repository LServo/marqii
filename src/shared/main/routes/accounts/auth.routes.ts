import { Router } from "express";

import { AuthenticateController } from "@/modules/accounts/use-cases/authenticate/authenticate-controller.js";
import { NewPasswordController } from "@/modules/accounts/use-cases/new-password/new-password-controller.js";
import { expressRouter as execute } from "../../middlewares/index.js";

const v1AuthRoutes = Router();

v1AuthRoutes.post("/login", execute(new AuthenticateController()));

v1AuthRoutes.post("/new-password", execute(new NewPasswordController()));

// v1AuthRoutes.post("/logoff", execute(new AuthenticateClearController()));

export { v1AuthRoutes };
