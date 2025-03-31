import { catchRequisition } from "../middlewares/catch-requisition.js";
import { errorHandler } from "../middlewares/error-handler.js";
import { developmentRoutes } from "../routes/index.js";
const { default: { version: pckVersion }, } = await import("@root/package.json", {
    with: { type: "json" },
});
const setupRoutes = (app) => {
    app.use(catchRequisition);
    app.use("/v1", developmentRoutes);
    app.get("/", (_req, res) => {
        res.status(200).send({
            api: "Pratice API",
            status: "OK",
            current_version: pckVersion,
        });
    });
    app.use(errorHandler);
};
export { setupRoutes };
//# sourceMappingURL=routes.js.map