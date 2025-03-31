import express from "express";

import { setupMiddlewares } from "@/shared/main/settings/middlewares.js";
import { setupRoutes } from "@/shared/main/settings/routes.js";

import "@/shared/main/settings/env";

const app = express();

setupMiddlewares(app);
setupRoutes(app);

export { app };
