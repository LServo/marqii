import type { RequestInput } from "@/shared/application/index.js";

export namespace DTONewPasswordController {
	/**
     * @description Interface de Entrada para o Controller `DTONewPasswordController`
     * @example
     * type RequestInput = {
        [key: string]: unknown;
        userContext: typeof request.user;
        fileContext: Express.Multer.File[];
    };
    interface Input extends RequestInput {
        email: string;
        password: string;
         newPassword: string;
    }
     */
	export interface Input extends RequestInput {
		email: string;
		password: string;
		newPassword: string;
	}
}

export namespace DTONewPasswordUseCase {
	/**
     * @description Interface de Entrada para o Controller `DTONewPasswordUseCase`
     * @example
    interface Input extends RequestInput {
        email: string;
        password: string;
         newPassword: string;
    }
     */
	export interface Input {
		email: string;
		password: string;
		newPassword: string;
	}
}
