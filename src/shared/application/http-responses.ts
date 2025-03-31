import { AppError } from "./errors-class.js";
import type { errorMsgs } from "./errors-msgs.js";

export interface HttpResponse<T = unknown> {
	statusCode: number;
	data: T;
}

type ErrorOrMessages =
	| { error: Error; error_code?: never; detailed?: never }
	| { error_code: keyof typeof errorMsgs; detailed?: unknown; error?: never };

/**
 * @description Resposta de status **200** indicada para leitura de um recurso.
 * @param data Dados que serão retornados na resposta. Pode ser um buffer binário ou qualquer outro tipo de dado.
 * @returns Retorna um objeto de resposta com o status 200.
 */
export const ok = <T = unknown>(data: T): HttpResponse<T> => ({
	statusCode: 200,
	data,
});

/**
 * @description Resposta de status **201** indicada para quando um recurso é criado
 * @param data Dados que serão retornados na resposta
 * @returns Retorna um objeto de resposta com o status 201
 */
export const created = <T = unknown>(data: T): HttpResponse<T> => ({
	statusCode: 201,
	data: data,
});

/**
 * @description Resposta de status **204** indicada para quando um recurso é deletado ou ao subir arquivos
 * @operational Essa função é utilizada para retornar uma resposta sem conteúdo
 * @returns Retorna um objeto de resposta com o status 204
 */
export const noContent = (): HttpResponse => ({
	statusCode: 204,
	data: undefined,
});

/**
 * @description Resposta de status **302** indicada redirecionamento de telas.
 * @param redirectUrl URL que será utilizada no redirecionamento
 * @returns Retorna um objeto de resposta com o status 200.
 */
export const redirect = <T = string>(redirectUrl: T): HttpResponse<T> => ({
	statusCode: 302,
	data: redirectUrl,
});

/**
 * @description Resposta de status **400** indicada para quando ocorre algum erro de validação na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 400
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 400
 */
export const badRequest = ({
	error_code,
	error,
	detailed,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 400,
	data: error ? error : new AppError({ error_code, detailed }),
});

/**
 * @description Resposta de status **401** indicada para quando ocorre algum erro de autenticação na requisição
 * @returns Retorna um objeto de resposta com o status 401
 */
export const unauthorized = ({
	error_code,
	detailed,
	error,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 401,
	data: error ? error : new AppError({ error_code, detailed }),
});

/**
 * @description Resposta de status **403** indicada para quando ocorre algum erro de permissão na requisição
 * @returns Retorna um objeto de resposta com o status 403
 */
export const forbidden = ({
	error_code,
	error,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 403,
	data: error ? error : new AppError({ error_code }),
});

/**
 * @description Resposta de status **404** indicada para quando um recurso não é encontrado
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 404
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 404
 */
export const notFound = ({
	error_code,
	error,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 404,
	data: error ? error : new AppError({ error_code }),
});

/**
 * @description Resposta de status **409** indicada para quando ocorre algum erro de conflito na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 409
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 409
 */
export const conflict = ({
	error_code,
	error,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 409,
	data: error ? error : new AppError({ error_code }),
});

/**
 * @description Resposta de status **422** indicada para quando ocorre algum erro de validação na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 422
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error Erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 422
 */
export const unprocessableEntity = ({
	error_code,
	error,
	detailed,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 422,
	data: error ? error : new AppError({ error_code, detailed }),
});

/**
 * @description Resposta de status **500** indicada para quando ocorre algum erro interno na requisição
 * @operational Esse método recebe um erro e retorna um objeto de resposta com o status 500
 * @param error_code Código do erro que ocorreu na validação da requisição
 * @param error Erro que ocorreu na validação da requisição
 * @returns Retorna um objeto de resposta com o status 500
 */
export const serverError = ({
	error_code,
	error,
	detailed,
}: ErrorOrMessages): HttpResponse<Error | AppError> => ({
	statusCode: 500,
	data: error ? error : new AppError({ error_code, detailed }),
});
