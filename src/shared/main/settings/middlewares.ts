import { type Express, json, urlencoded } from "express";

const expressParserLimit = "5mb";

const setupMiddlewares = (app: Express): void => {
	app.use(json({ limit: expressParserLimit }));
	app.use(urlencoded({ limit: expressParserLimit, extended: true }));
};

export { setupMiddlewares };
