import type { RequestInput } from "@/shared/application/index.js";
import type { JWTToken } from "@/shared/main/@types/index.js";

export namespace DTOAuthenticateClearController {
	/**
     * @description Interface de Entrada para o Controller `AuthenticateClearController`
     * @example

    interface Input extends RequestInput {
        accessToken: string;
    }
     */
	export interface Input extends RequestInput {
		accessToken: JWTToken;
	}
}

export namespace DTOAuthenticateClearUseCase {
	/**
     * @description Interface de Entrada para o UseCase `AuthenticateClearUseCase`
     * @example

    interface Input {
        accessToken: string;
    }
     */
	export interface Input {
		accessToken: JWTToken;
	}
}
