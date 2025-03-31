import { inject, injectable } from "tsyringe";

import { badRequest, unauthorized } from "@/shared/application/index.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { ICognitoProvider } from "@/shared/infra/containers/providers/cognito-provider/cognito-provider.interface.js";
import type { IJwtProvider } from "@/shared/infra/containers/providers/jwt-provider/jwt-provider.interface.js";

import type { DTOAuthenticateClearUseCase } from "./authenticate-clear.types.js";

@injectable()
class AuthenticateClearUseCase {
	constructor(
		@inject("CognitoProvider")
		private cognitoProvider: ICognitoProvider,
		@inject("JwtProvider")
		private jwtProvider: IJwtProvider,
	) {}

	async execute(params: DTOAuthenticateClearUseCase.Input): Promise<void> {
		SaveLogs.UseCaseTitle("AuthenticateClearUseCase (execute)");

		const decodedToken = this.jwtProvider.decode({
			token: params.accessToken,
		});
		console.log("decodedToken:", decodedToken);

		try {
			await this.cognitoProvider.logoff({
				accessToken: decodedToken.accessToken,
			});
		} catch (error) {
			if (error?.message === "Invalid Access Token")
				throw badRequest({ error_code: "ACCESS_TOKEN_BAD_FORMAT" });

			if (error?.name === "NotAuthorizedException")
				throw unauthorized({ error_code: "ACCESS_TOKEN_REVOKED" });
		}
	}
}

export { AuthenticateClearUseCase };
