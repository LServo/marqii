import { json, urlencoded } from "express";
const expressParserLimit = "5mb";
const setupMiddlewares = (app) => {
    app.use(json({ limit: expressParserLimit }));
    app.use(urlencoded({ limit: expressParserLimit, extended: true }));
};
export { setupMiddlewares };
//# sourceMappingURL=middlewares.js.map