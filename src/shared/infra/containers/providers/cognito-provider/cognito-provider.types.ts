import type { JWTToken } from "@/shared/main/@types/index.js";
import type { UserStatusType } from "@aws-sdk/client-cognito-identity-provider";

export namespace AuthLogin {
	/**
     * Interface de entrada para o método `initAuth` do `AuthProvider`
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
     * Interface de saída para o método `initAuth` do `AuthProvider`
     * @example
     * interface Output {
        accessToken: JWTToken;
        refreshToken: JWTToken;
        expiresIn: number;
    }
     */
	export interface Output {
		accessToken: JWTToken;
		refreshToken: JWTToken;
		expiresIn: number;
	}
}

export namespace ConfirmNewPassword {
	/**
     * Interface de entrada para o método `confirmNewPassword` do `AuthProvider`
     * @example
     * interface Input {
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

export namespace RefreshTokenResponse {
	/**
	 * Interface for the input to the `refreshToken` method of `CognitoProvider`
	 * @example
	 * {
	 *   refreshToken: "example_refresh_token"
	 * }
	 */
	export interface Input {
		refreshToken: JWTToken;
	}
	/**
	 * Interface for the output of the `refreshToken` method of `CognitoProvider`
	 * @example
	 * {
	 *   accessToken: "example_access_token",
	 *   refreshToken: "example_refresh_token",
	 *   expiresIn: 3600
	 * }
	 */
	export interface Output {
		accessToken: JWTToken;
		refreshToken: JWTToken;
		expiresIn: number;
	}
}

export namespace AdminCreateUser {
	export interface Input {
		username: string;
		userAttributes: { Name: string; Value: string }[];
	}

	export interface Output {
		username: string;
		userStatus: UserStatusType;
	}
}

export namespace AdminResetUserPassword {
	export interface Input {
		userName: string;
		tempPassword: string;
	}

	export type Output = undefined;
}

export namespace AdminUpdateUserAttributes {
	export interface Input {
		username: string;
		userAttributes: { Name: string; Value: string }[];
	}

	export type Output = undefined;
}

export namespace ResendConfirmationCode {
	export interface Input {
		username: string;
	}

	export type Output = undefined;
}

export namespace Logoff {
	export interface Input {
		accessToken: JWTToken;
	}

	export type Output = undefined;
}

export namespace GetUser {
	interface UserAttribute {
		Name: string;
		Value: string;
	}

	interface MFAOption {
		DeliveryMedium: string;
		AttributeName: string;
	}

	export interface User {
		Username: string;
		UserAttributes: UserAttribute[];
		UserCreateDate: Date;
		UserLastModifiedDate: Date;
		Enabled: boolean;
		UserStatus: string;
		MFAOptions: MFAOption[];
	}
	export interface Input {
		username: string;
	}
	export type Output = User;
}

export namespace DisableUser {
	export interface Input {
		username: string;
	}
}

export namespace EnableUser {
	export interface Input {
		username: string;
	}
}

export namespace SetupPoolConfigs {
	/**
     * Interface de entrada para o método `setupPoolConfigs` do `AuthProvider`
     * @example
     * interface Input {
        inviteTemplate: string;
        verifyTemplate: string;
    }
     */
	export interface Input {
		inviteTemplate: string;
		verifyTemplate: string;
	}
}
