import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";

import {
	type HttpResponse,
	InputValidationError,
	AppError
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";

export const errorHandler: ErrorRequestHandler = (
	err: HttpResponse | AppError | Error,
	_request: Request,
	response: Response,
	_next: NextFunction,
) => {
	// Verificar tipo de erro
	const isAppError = err instanceof AppError;
	const isInputValidationError = err instanceof InputValidationError;
	const isHttpResponse = 'statusCode' in err && 'data' in err;
	
	// Extrair dados do erro
	let statusCode = 500;
	let errorMessage = "Internal Server Error";
	let errorCode = "INTERNAL_SERVER_ERROR";
	let detailedError = null;

	if (isAppError) {
		statusCode = 400; // Padrão para AppError
		errorMessage = err.message;
		errorCode = err.error;
		detailedError = err.detailed;
	} else if (isInputValidationError) {
		statusCode = err.statusCode || 422;
		errorMessage = err.message;
		errorCode = err.error;
		detailedError = err.detailed;
	} else if (isHttpResponse) {
		const httpResponse = err as HttpResponse;
		statusCode = httpResponse.statusCode;
		const responseData = httpResponse.data as any;
		
		errorMessage = responseData.message || "Error";
		errorCode = responseData.error || "ERROR";
		detailedError = responseData.detailed || null;
	} else {
		// Erro genérico
		errorMessage = err.message || "Unknown error";
	}

	// Montar resposta
	const responseData = {
		error: errorCode,
		message: errorMessage,
		...(detailedError ? { detailed: detailedError } : {})
	};

	SaveLogs.ErrorHandler(statusCode, responseData);
	response.status(statusCode).json(responseData);
};
