import { Router } from "express";

import { CreateMenuController } from "@/modules/menu/use-cases/create-menu/create-menu-controller.js";
import { expressRouter as execute } from "../../middlewares/index.js";

const v1MenuRoutes = Router();

v1MenuRoutes.post("/create", execute(new CreateMenuController()));

export { v1MenuRoutes };
