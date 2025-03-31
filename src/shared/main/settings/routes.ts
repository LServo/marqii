import type { Express } from "express";

import { catchRequisition } from "../middlewares/catch-requisition.js";
import { errorHandler } from "../middlewares/error-handler.js";
import { developmentRoutes } from "../routes/index.js";

const {
	default: { version: pckVersion },
} = await import("@root/package.json", {
	with: { type: "json" },
});

const setupRoutes = (app: Express): void => {
	/**
	 * Middleware para capturar Requisição
	 */
	app.use(catchRequisition);

	/**
	 * Rotas da API (v1)
	 */
	app.use("/v1", developmentRoutes);

	/**
	 * Rota de status da API
	 */
	app.get("/", (_req, res) => {
		res.status(200).send({
			api: "Pratice API",
			status: "OK",
			current_version: pckVersion,
		});
	});

	// /**
	//  * Middleware para capturar Erros
	//  */
	app.use(errorHandler);
};

export { setupRoutes };
