import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";

import {
	type HttpResponse,
	InputValidationError,
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";

interface ErrorType {
	error?: string;
	message?: string;
	detailed?: string;
	statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
	err: HttpResponse | ErrorType,
	_request: Request,
	response: Response,
	_next: NextFunction,
) => {
	const serverError = !err.statusCode || err.statusCode === 500;
	const inputValidationError = err instanceof InputValidationError;

	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	const message = err["data"]?.message || err["message"] || null;
	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	const detailed = err["data"]?.detailed || err["detailed"] || null;
	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	const errorCode = err["data"]?.error || err["error"] || null;
	const statusCode = (
		serverError ? 500 : inputValidationError ? 422 : err.statusCode
	) as number;

	const data = {};
	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	if (message) data["message"] = message;
	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	if (detailed) data["detailed"] = detailed;
	// biome-ignore lint/complexity/useLiteralKeys: Será refatorado em breve
	data["error"] =
		!errorCode || serverError ? "Internal Server Error" : errorCode;

	SaveLogs.ErrorHandler(statusCode, data);
	response.status(statusCode).json(data);
};
