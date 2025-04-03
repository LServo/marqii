import { Router } from "express";

import { CreateMenuOrchestrator } from "@/modules/menu/use-cases/orchestrator/controller.js";
import { container } from "tsyringe";
import { expressRouter as execute } from "../../middlewares/index.js";

const v1MenuRoutes = Router();

const createMenuOrchestrator = container.resolve(CreateMenuOrchestrator);

v1MenuRoutes.post("/create", execute(createMenuOrchestrator));

export { v1MenuRoutes };
