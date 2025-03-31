import type { RequestInput } from "@/shared/application/index.js";
import type { JWTToken, UUID } from "@/shared/main/@types/index.js";

export namespace DTOAuthenticateController {
	/**
     * @description Interface de Entrada para o Controller `AuthenticateUserController`
     * @example
     * type RequestInput = {
        [key: string]: unknown;
        userContext: typeof request.user;
        fileContext: Express.Multer.File[];
    };
    interface Input extends RequestInput {
        email: string;
        password: string;
    }
     */
	export interface Input extends RequestInput {
		email: string;
		password: string;
	}

	/**
     * @description Interface de Saída para o Controller `AuthenticateUserController`
     * @example
     * interface Output {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }
     */
	export interface Output {
		accessToken: string;
		expiresIn: number;
	}
}

export namespace DTOAuthenticateUseCase {
	/**
     * @description Interface de Entrada para o UseCase `AuthenticateUserUseCase`
     * @example
     * interface Input {
        email: string;
        password: string;
    }
     */
	export interface Input {
		email: string;
		password: string;
	}

	/**
     * @description Interface de Saída para o UseCase `AuthenticateUserUseCase`
     * @example
     * interface Output {
        accessToken: JWTToken;
        refreshToken: JWTToken;
        expiresIn: number;
    }
     */
	export interface Output {
		accessToken: JWTToken;
		expiresIn: number;
	}

	export interface GenerateTokens {
		cognitoData: {
			accessToken: JWTToken;
			expiresIn: string | number;
		};
		userId: UUID;
	}
}
