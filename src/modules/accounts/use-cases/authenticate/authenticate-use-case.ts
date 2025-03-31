// import { inject, injectable } from "tsyringe";

// import type {
// 	IAuthAttemptsRepository,
// 	IUsersRepository,
// } from "@/modules/accounts/infra/repositories";
// import type { FindUserByEmail } from "@/modules/accounts/infra/repositories/UsersRepository.types";
// import {
// 	badRequest,
// 	forbidden,
// 	notFound,
// 	serverError,
// 	unauthorized,
// 	unprocessableEntity,
// } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save_logs";
// import type { ICognitoProvider } from "@/shared/infra/container/providers/CognitoProvider/ICognitoProvider";
// import type { IJwtProvider } from "@/shared/infra/container/providers/JwtProvider/IJwtProvider";
// import type { GenerateToken } from "@/shared/infra/container/providers/JwtProvider/jwtProvider.types";
// import type { JWTToken } from "@/shared/main/@types";
// import { convertToSeconds } from "@/utils/ConvertToSeconds";
// import { encryptData } from "@/utils/Encrypt";

// import { AuthenticateRules } from "./Authenticate.rules";
// import type { DTOAuthenticateUseCase } from "./authenticate.types";

// @injectable()
// class AuthenticateUseCase {
// 	constructor(
//         @inject('AuthAttemptsRepository')
//         private authAttemptsRepository: IAuthAttemptsRepository,
//         @inject('CognitoProvider')
//         private cognitoProvider: ICognitoProvider,
//         @inject('JwtProvider')
//         private jwtProvider: IJwtProvider,
//         @inject('UsersRepository')
//         private usersRepository: IUsersRepository,
//     ) {}

// 	private userFound: FindUserByEmail.Output;
// 	private responses = AuthenticateRules.responses;
// 	private expiresInAccessToken: string = process.env.JWT_EXPIRES_IN;
// 	private expiresInRefreshToken: string = process.env.JWT_REFRESH_EXPIRES_IN;

// 	async execute({
// 		email,
// 		password,
// 	}: DTOAuthenticateUseCase.Input): Promise<DTOAuthenticateUseCase.Output> {
// 		SaveLogs.UseCaseTitle("AuthenticateUseCase (execute)");

// 		let authAttemptsResult = 0;
// 		try {
// 			const user = await this.cognitoProvider.getUser({
// 				username: email,
// 			});

// 			if (!user.Enabled)
// 				throw forbidden({
// 					error_msgs: this.responses[403],
// 					error_code: "AUTH_USER_BLOCKED",
// 				});

// 			const userFound = await this.usersRepository.findUserByEmail({
// 				email,
// 			});

// 			this.userFound = userFound;

// 			if (!userFound)
// 				throw notFound({
// 					error_msgs: this.responses[404],
// 					error_code: "AUTH_USER_NOT_FOUND",
// 				});

// 			if (userFound.active !== true)
// 				throw unprocessableEntity({
// 					error_msgs: this.responses[422],
// 					error_code: "AUTH_USER_DISABLED",
// 				});

// 			authAttemptsResult = userFound.authAttempt || 0;

// 			if (authAttemptsResult >= 5) {
// 				await this.cognitoProvider.disableUser({ username: email });
// 				await this.authAttemptsRepository.deleteAuthAttempt({
// 					userId: userFound.id,
// 				});
// 				throw forbidden({
// 					error_msgs: this.responses[403],
// 					error_code: "AUTH_USER_BLOCKED",
// 				});
// 			}

// 			const loginObject = {
// 				email,
// 				password,
// 			};
// 			const output = await this.cognitoProvider.authLogin(loginObject);

// 			if (user.UserStatus === "FORCE_CHANGE_PASSWORD")
// 				throw badRequest({
// 					error_msgs: this.responses[400],
// 					error_code: "AUTH_RESET_NEW_PASSWORD",
// 				});

// 			if (authAttemptsResult > 0)
// 				this.authAttemptsRepository.deleteAuthAttempt({
// 					userId: userFound.id,
// 				});

// 			if (user.UserStatus === "FORCE_CHANGE_PASSWORD")
// 				throw badRequest({
// 					error_msgs: this.responses[400],
// 					error_code: "AUTH_RESET_NEW_PASSWORD",
// 				});

// 			const userData = {
// 				accessTokenAWS: output.accessToken,
// 				refreshTokenAWS: output.refreshToken,
// 				expiresInAWS: output.expiresIn,
// 				userId: userFound.id,
// 				userInformation: {
// 					name: userFound.name,
// 					profile: userFound.userProfiles[0],
// 					credentials: encryptData(JSON.stringify(loginObject)),
// 					groupsNames: userFound.userGroups?.join(" / ") || null,
// 					isDoctor: userFound.isDoctor,
// 				},
// 				grants: userFound.userGrants,
// 			};

// 			const accessToken: JWTToken = this.generateTokens({
// 				payload: userData,
// 				expiresIn: this.expiresInAccessToken,
// 			});

// 			const refreshToken: JWTToken = this.generateTokens({
// 				payload: userData,
// 				expiresIn: this.expiresInRefreshToken,
// 			});

// 			return {
// 				accessToken,
// 				refreshToken,
// 				expiresIn: convertToSeconds(this.expiresInAccessToken),
// 				userInformation: userData.userInformation,
// 				grants: userData.grants,
// 			};
// 		} catch (error) {
// 			if (error?.name === "UserNotFoundException")
// 				throw notFound({
// 					error_msgs: this.responses[404],
// 					error_code: "AUTH_USER_NOT_FOUND",
// 				});

// 			if (error?.name === "NotAuthorizedException") {
// 				if (authAttemptsResult === 0) {
// 					authAttemptsResult =
// 						await this.authAttemptsRepository.createAuthAttempt({
// 							userId: this.userFound.id,
// 						});
// 				} else {
// 					authAttemptsResult += 1;
// 					await this.authAttemptsRepository.updateAuthAttempt({
// 						userId: this.userFound.id,
// 						attempts: authAttemptsResult,
// 					});
// 				}

// 				throw unauthorized({
// 					error_msgs: this.responses[401],
// 					error_code: "AUTH_USER_OR_PASSWORD_INVALID",
// 					detailed: {
// 						remainingAttempts: 5 - authAttemptsResult,
// 					},
// 				});
// 			}

// 			if (error?.statusCode === 400)
// 				throw badRequest({
// 					error_msgs: this.responses[400],
// 					error_code: "AUTH_RESET_NEW_PASSWORD",
// 				});

// 			if (error?.statusCode === 403)
// 				throw forbidden({
// 					error_msgs: this.responses[403],
// 					error_code: "AUTH_USER_BLOCKED",
// 				});

// 			if (error?.statusCode === 404)
// 				throw notFound({
// 					error_msgs: this.responses[404],
// 					error_code: "AUTH_USER_NOT_FOUND",
// 				});

// 			if (error?.statusCode === 422)
// 				throw unprocessableEntity({
// 					error_msgs: this.responses[422],
// 					error_code: "AUTH_USER_DISABLED",
// 				});

// 			throw serverError({ error });
// 		}
// 	}

// 	private generateTokens({
// 		payload,
// 		expiresIn,
// 	}: GenerateToken.Input): JWTToken {
// 		const result = this.jwtProvider.generateToken({ payload, expiresIn });

// 		return result.jwtToken as JWTToken;
// 	}
// }

// export { AuthenticateUseCase };
