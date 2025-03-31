// import { inject, injectable } from "tsyringe";

// import { badRequest, unauthorized } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save_logs";
// import type { ICognitoProvider } from "@/shared/infra/container/providers/CognitoProvider/ICognitoProvider";
// import type { IJwtProvider } from "@/shared/infra/container/providers/JwtProvider/IJwtProvider";

// import { AuthenticateClearRules } from "./AuthenticateClear.rules";
// import type { DTOAuthenticateClearUseCase } from "./authenticate-clear.types";

// @injectable()
// class AuthenticateClearUseCase {
// 	constructor(
//         @inject('CognitoProvider')
//         private cognitoProvider: ICognitoProvider,
//         @inject('JwtProvider')
//         private jwtProvider: IJwtProvider,
//     ) {}
// 	private responses = AuthenticateClearRules.responses;

// 	async execute(params: DTOAuthenticateClearUseCase.Input): Promise<void> {
// 		SaveLogs.UseCaseTitle("AuthenticateClearUseCase (execute)");

// 		try {
// 			const decodedToken = this.jwtProvider.decode({
// 				token: params.accessToken,
// 			});

// 			await this.cognitoProvider.logoff({
// 				accessToken: decodedToken.accessTokenAWS,
// 			});
// 		} catch (error) {
// 			if (error?.message === "Invalid Access Token")
// 				throw badRequest({
// 					error_msgs: this.responses[400],
// 					error_code: "ACCESS_TOKEN_BAD_FORMAT",
// 				});

// 			if (error?.name === "NotAuthorizedException")
// 				throw unauthorized({
// 					error_msgs: this.responses[401],
// 					error_code: "ACCESS_TOKEN_REVOKED",
// 				});
// 		}
// 	}
// }

// export { AuthenticateClearUseCase };
