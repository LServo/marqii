import { errorMsgs } from "./errors-msgs.js";
export class UnauthorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = "UnauthorizedError";
    }
}
export class ForbiddenError extends Error {
    constructor() {
        super("Access denied");
        this.name = "ForbiddenError";
    }
}
export class AppError extends Error {
    error;
    message;
    detailed;
    constructor({ error_code, detailed }) {
        super("App Error");
        const errorMsg = errorMsgs[error_code];
        const errorCode = error_code;
        this.error = errorCode;
        this.message = errorMsg;
        this.detailed = detailed;
    }
}
export class InputValidationError extends Error {
    message;
    error;
    detailed;
    statusCode;
    constructor({ message, detailed, statusCode = 422 }) {
        super("Input Validation Error");
        this.error = "Input Validation Error";
        this.message = message;
        this.detailed = detailed;
        this.statusCode = statusCode;
    }
}
//# sourceMappingURL=errors-class.js.map