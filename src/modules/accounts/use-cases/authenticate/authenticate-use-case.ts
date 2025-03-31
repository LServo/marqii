import { inject, injectable } from "tsyringe";

import { env } from "node:process";
import type {
	GetUserByEmail,
	IUsersRepository,
} from "@/modules/accounts/infra/repository/users-repository/index.js";
import {
	badRequest,
	forbidden,
	notFound,
	serverError,
	unauthorized,
	unprocessableEntity,
} from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";
import type {
	AuthLogin,
	GetUser,
} from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.types.js";
import type { IJwtProvider } from "@/shared/infra/containers/providers/jwt-provider/jwt-provider.interface.js";
import type { JWTToken } from "@/shared/main/@types/index.js";
import { convertToSeconds } from "@/utils/convert-to-seconds.js";
import type { DTOAuthenticateUseCase } from "./authenticate.types.js";

@injectable()
class AuthenticateUseCase {
	constructor(
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
		@inject("JwtProvider")
		private jwtProvider: IJwtProvider,
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
	) {}

	private expiresInAccessToken: string = env.JWT_EXPIRES_IN || "1h";

	async execute({
		email,
		password,
	}: DTOAuthenticateUseCase.Input): Promise<DTOAuthenticateUseCase.Output> {
		SaveLogs.UseCaseTitle("AuthenticateUseCase (execute)");

		const userFound = await this.getUserInDatabase(email);
		await this.validateCognitoData(email);

		try {
			const cognitoAuth = await this.InitiateAuthCommand({ email, password });

			const accessToken: JWTToken = this.generateAccessToken({
				userId: userFound.id,
				cognitoData: cognitoAuth,
			});

			return {
				accessToken,
				expiresIn: convertToSeconds(this.expiresInAccessToken),
			};
		} catch (error) {
			if (error?.name === "NotAuthorizedException")
				throw unauthorized({ error_code: "AUTH_USER_OR_PASSWORD_INVALID" });

			throw serverError({ error });
		}
	}

	private generateAccessToken({
		userId,
		cognitoData,
	}: DTOAuthenticateUseCase.GenerateTokens): JWTToken {
		const payload = {
			userId,
			...cognitoData,
		};

		const { jwtToken: generatedToken } = this.jwtProvider.generateToken({
			payload,
			expiresIn: this.expiresInAccessToken,
		});

		return generatedToken;
	}

	private async getUserInDatabase(
		email: DTOAuthenticateUseCase.Input["email"],
	): Promise<GetUserByEmail.Output> {
		const userFound = await this.usersRepository.getUserByEmail({
			email,
		});

		if (!userFound) throw notFound({ error_code: "USER_NOT_FOUND" });

		if (userFound.active !== true)
			throw unprocessableEntity({ error_code: "AUTH_USER_DISABLED" });

		return userFound;
	}

	private async validateCognitoData(
		email: DTOAuthenticateUseCase.Input["email"],
	): Promise<void> {
		const cognitoData = await this.cognitoProvider.getUser({
			username: email,
		});

		if (!cognitoData.Enabled)
			throw forbidden({ error_code: "AUTH_USER_BLOCKED" });
		if (cognitoData.UserStatus === "FORCE_CHANGE_PASSWORD")
			throw badRequest({ error_code: "AUTH_RESET_NEW_PASSWORD" });
	}

	private async InitiateAuthCommand({
		email,
		password,
	}: DTOAuthenticateUseCase.Input): Promise<AuthLogin.Output> {
		const loginObject = {
			email,
			password,
		};

		const output = await this.cognitoProvider.authLogin(loginObject);

		return output;
	}
}

export { AuthenticateUseCase };
