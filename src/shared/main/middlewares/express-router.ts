import type { RequestHandler } from "express";
import type { Controller } from "../../application/index.js";
import { SaveLogs } from "../../application/save-logs.js";

type Middleware = (controller: Controller) => RequestHandler;

export const expressRouter: Middleware =
	(controller) => async (request, response) => {
		const { statusCode, data } = await controller.execute({
			...request.body,
			...request.params,
			...request.query,
			headers: request.headers,
			userContext: request.user,
		});

		SaveLogs.ExpressOutput(statusCode);

		response.status(statusCode).json(data);
	};
