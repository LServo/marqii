import "./settings/main-alias";
import "reflect-metadata";
import "express-async-errors";
import "@/shared/infra/containers";

import listEndpoints from "express-list-endpoints";

import { app } from "@/shared/main/settings/index.js";

import { lightBlue, lightGreen, white } from "../application/ansi-colors.js";
import { logger } from "../application/logger.js";

const port = process.env.PORT || 8080;
const version = process.env.API_VERSION || "v1";
const api_url = "http://localhost";

const routes = listEndpoints(app);

const bootLog = () => {
	logger.info(white, "--------------------------------------------------\n");
	logger.info(
		lightGreen,
		`[app] server is running at ${api_url}:${port}/${version}/`,
	);
	logger.info(lightGreen, "[app] press ctrl-c to stop");
	logger.info(lightGreen, `[app] mapped routes: ${routes.length}`);

	if (process.env.SHOW_ROUTES === "true") {
		logger.info("\n");

		// lista de rotas mapeadas
		routes.forEach((route: listEndpoints.Endpoint, index) => {
			logger.info(
				lightBlue,
				`[app] ${index + 1}. path: ${
					route.path
				}, methods: ${route.methods.join(", ")}`,
			);
		});
	}

	logger.info(white, "\n--------------------------------------------------\n");
};

app.listen(port, bootLog);
