import { SaveLogs } from "../../application/save-logs.js";
export const expressRouter = (controller) => async (request, response) => {
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
//# sourceMappingURL=express-router.js.map