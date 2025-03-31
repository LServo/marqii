import type { JWTToken } from "@/shared/main/@types/index.js";

export namespace Decode {
	/**
     * Interface de entrada para o método `decode` do `AuthProvider`
     * @example
     * interface Input {
        token: JWTToken;
    }
     */
	export interface Input {
		token: JWTToken;
	}

	/**
     * Interface de saída para o método `decode` do `AuthProvider`
     * @example
     * interface Output {
		userId: string;
		payload: unknown;
		accessToken: JWTToken;
	}
     */
	export interface Output {
		userId: string;
		payload: unknown;
		accessToken: JWTToken;
	}
}
export namespace Verify {
	/**
     * Interface de entrada para o método `verify` do `AuthProvider`
     * @example
     * interface Input {
        token: JWTToken;
    }
     */
	export interface Input {
		token: JWTToken;
	}

	/**
     * Interface de saída para o método `verify` do `AuthProvider`
     * @example
     * interface Output {
        payload: unknown;
    }
     */
	export interface Output {
		payload: unknown;
	}
}

export namespace GenerateToken {
	/**
     * Interface de entrada para o método `generateToken` do `AuthProvider`
     * @example
     * interface Input {
        payload: unknown;
        expiresIn: string | number;
    }
     */
	export interface Input {
		payload: unknown;
		expiresIn: string | number;
	}

	/**
     * Interface de saída para o método `generateToken` do `AuthProvider`
     * @example
     * interface Output {
        jwtToken: JWTToken;
    }
     */
	export interface Output {
		jwtToken: JWTToken;
	}
}
