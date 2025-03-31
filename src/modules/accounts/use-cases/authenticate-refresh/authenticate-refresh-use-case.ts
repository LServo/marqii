// import { inject, injectable } from "tsyringe";

// import { badRequest, unauthorized } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save_logs";
// import type { AuthLogin } from "@/shared/infra/container/providers/CognitoProvider/CognitoProvider.types";
// import type { ICognitoProvider } from "@/shared/infra/container/providers/CognitoProvider/ICognitoProvider";
// import type { IJwtProvider } from "@/shared/infra/container/providers/JwtProvider/IJwtProvider";
// import type { GenerateToken } from "@/shared/infra/container/providers/JwtProvider/jwtProvider.types";
// import type { JWTToken } from "@/shared/main/@types";
// import { convertToSeconds } from "@/utils/ConvertToSeconds";
// import { decryptData } from "@/utils/Decrypt";

// import { AuthenticateRefreshRules } from "./AuthenticateRefresh.rules";
// import type { DTOAuthenticateRefreshUseCase } from "./authenticate-refresh.types";

// @injectable()
// class AuthenticateRefreshUseCase {
// 	constructor(
//         @inject('CognitoProvider')
//         private cognitoProvider: ICognitoProvider,
//         @inject('JwtProvider')
//         private jwtProvider: IJwtProvider,
//     ) {}

// 	private expiresInRefreshToken: string =
// 		process.env.JWT_REFRESH_EXPIRES_IN || "1d";
// 	private expiresInAccessToken: string = process.env.JWT_EXPIRES_IN || "1h";
// 	private responses = AuthenticateRefreshRules.responses;
// 	private userCredentials: { email: string; password: string };
// 	private awsTokens: AuthLogin.Output;

// 	async execute({
// 		refreshToken,
// 	}: DTOAuthenticateRefreshUseCase.Input): Promise<DTOAuthenticateRefreshUseCase.Output> {
// 		SaveLogs.UseCaseTitle("AuthenticateRefreshUseCase (execute)");

// 		const jwtDecoded = this.jwtProvider.decode({ token: refreshToken });

// 		try {
// 			const userCredentials = JSON.parse(
// 				decryptData(jwtDecoded.userInformation.credentials),
// 			) as unknown as { email: string; password: string };

// 			this.userCredentials = userCredentials;
// 		} catch (error) {
// 			throw badRequest({
// 				error_code: "REFRESH_TOKEN_BAD_FORMAT",
// 				error_msgs: this.responses[400],
// 			});
// 		}

// 		try {
// 			const awsTokens = await this.cognitoProvider.authLogin({
// 				email: this.userCredentials.email,
// 				password: this.userCredentials.password,
// 			});

// 			this.awsTokens = awsTokens;
// 		} catch (error) {
// 			throw unauthorized({
// 				error_code: "REFRESH_TOKEN_INVALID",
// 				error_msgs: this.responses[401],
// 			});
// 		}

// 		const userData = {
// 			accessTokenAWS: this.awsTokens.accessToken,
// 			refreshTokenAWS: this.awsTokens.refreshToken,
// 			expiresInAWS: this.awsTokens.expiresIn,
// 			userId: jwtDecoded.userId,
// 			userInformation: jwtDecoded.userInformation,
// 			grants: jwtDecoded.grants,
// 		};

// 		const accessToken: JWTToken = this.generateTokens({
// 			payload: userData,
// 			expiresIn: this.expiresInAccessToken,
// 		});

// 		const newRefreshToken: JWTToken = this.generateTokens({
// 			payload: userData,
// 			expiresIn: this.expiresInRefreshToken,
// 		});

// 		return {
// 			accessToken,
// 			refreshToken: newRefreshToken,
// 			expiresIn: convertToSeconds(this.expiresInAccessToken),
// 		};
// 	}

// 	private generateTokens({
// 		payload,
// 		expiresIn,
// 	}: GenerateToken.Input): JWTToken {
// 		const result = this.jwtProvider.generateToken({ payload, expiresIn });

// 		return result.jwtToken as JWTToken;
// 	}
// }

// export { AuthenticateRefreshUseCase };
