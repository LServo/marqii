import { AppError } from "./errors-class.js";
export const ok = (data) => ({
    statusCode: 200,
    data,
});
export const created = (data) => ({
    statusCode: 201,
    data: data,
});
export const noContent = () => ({
    statusCode: 204,
    data: undefined,
});
export const redirect = (redirectUrl) => ({
    statusCode: 302,
    data: redirectUrl,
});
export const badRequest = ({ error_code, error, detailed, }) => ({
    statusCode: 400,
    data: error ? error : new AppError({ error_code, detailed }),
});
export const unauthorized = ({ error_code, detailed, error, }) => ({
    statusCode: 401,
    data: error ? error : new AppError({ error_code, detailed }),
});
export const forbidden = ({ error_code, error, }) => ({
    statusCode: 403,
    data: error ? error : new AppError({ error_code }),
});
export const notFound = ({ error_code, error, }) => ({
    statusCode: 404,
    data: error ? error : new AppError({ error_code }),
});
export const conflict = ({ error_code, error, }) => ({
    statusCode: 409,
    data: error ? error : new AppError({ error_code }),
});
export const unprocessableEntity = ({ error_code, error, detailed, }) => ({
    statusCode: 422,
    data: error ? error : new AppError({ error_code, detailed }),
});
export const serverError = ({ error_code, error, detailed, }) => ({
    statusCode: 500,
    data: error ? error : new AppError({ error_code, detailed }),
});
//# sourceMappingURL=http-responses.js.map