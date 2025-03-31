import { InputValidationError, } from "../../../shared/application/index.js";
import { SaveLogs } from "../../../shared/application/save-logs.js";
export const errorHandler = (err, _request, response, _next) => {
    const serverError = !err.statusCode || err.statusCode === 500;
    const inputValidationError = err instanceof InputValidationError;
    const message = err["data"]?.message || err["message"] || null;
    const detailed = err["data"]?.detailed || err["detailed"] || null;
    const errorCode = err["data"]?.error || err["error"] || null;
    const statusCode = (serverError ? 500 : inputValidationError ? 422 : err.statusCode);
    const data = {};
    if (message)
        data["message"] = message;
    if (detailed)
        data["detailed"] = detailed;
    data["error"] =
        !errorCode || serverError ? "Internal Server Error" : errorCode;
    SaveLogs.ErrorHandler(statusCode, data);
    response.status(statusCode).json(data);
};
//# sourceMappingURL=error-handler.js.map