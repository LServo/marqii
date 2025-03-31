import { type TErrorMsg, errorMsgs } from "./errors-msgs.js";

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

interface TAppError {
	error_code: keyof TErrorMsg;
	detailed?: unknown;
}

export class AppError extends Error {
	public readonly error: string;
	public override readonly message: string;
	public readonly detailed: unknown;

	constructor({ error_code, detailed }: TAppError) {
		super("App Error");
		const errorMsg = errorMsgs[error_code] as string;
		const errorCode = error_code as string;

		this.error = errorCode;
		this.message = errorMsg;
		this.detailed = detailed;
	}
}

interface TInputValidationError {
	detailed?: unknown;
	message?: string;
	statusCode?: number;
}
export class InputValidationError extends Error {
	public override readonly message: string;
	public readonly error: string;
	public readonly detailed: unknown;
	public readonly statusCode: number;

	constructor({ message, detailed, statusCode = 422 }: TInputValidationError) {
		super("Input Validation Error");
		this.error = "Input Validation Error";
		this.message = message as string;
		this.detailed = detailed;
		this.statusCode = statusCode;
	}
}
