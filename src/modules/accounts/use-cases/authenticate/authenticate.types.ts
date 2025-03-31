// import type { RequestInput } from "@/shared/application";
// import type { JWTToken } from "@/shared/main/@types";

// export namespace DTOAuthenticateController {
// 	/**
//      * @description Interface de Entrada para o Controller `AuthenticateUserController`
//      * @example
//      * type RequestInput = {
//         [key: string]: unknown;
//         userContext: typeof request.user;
//         fileContext: Express.Multer.File[];
//     };
//     interface Input extends RequestInput {
//         email: string;
//         password: string;
//     }
//      */
// 	export interface Input extends RequestInput {
// 		email: string;
// 		password: string;
// 	}

// 	/**
//      * @description Interface de Saída para o Controller `AuthenticateUserController`
//      * @example
//      * interface Output {
//         accessToken: string;
//         refreshToken: string;
//         expiresIn: number;
//         userInformation: {
//             name: string;
//             groupsNames: string;
//         };
//         grants: string[];
//     }
//      */
// 	export interface Output {
// 		accessToken: string;
// 		refreshToken: string;
// 		expiresIn: number;
// 		userInformation: {
// 			name: string;
// 			groupsNames: string;
// 		};
// 		grants: string[];
// 	}
// }

// export namespace DTOAuthenticateUseCase {
// 	interface UserInformation {
// 		groupsNames: string;
// 		name: string;
// 		profile: string;
// 	}
// 	/**
//      * @description Interface de Entrada para o UseCase `AuthenticateUserUseCase`
//      * @example
//      * interface Input {
//         email: string;
//         password: string;
//     }
//      */
// 	export interface Input {
// 		email: string;
// 		password: string;
// 	}

// 	/**
//      * @description Interface de Saída para o UseCase `AuthenticateUserUseCase`
//      * @example
//      * interface Output {
//         accessToken: JWTToken;
//         refreshToken: JWTToken;
//         expiresIn: number;
//     }
//      */
// 	export interface Output {
// 		accessToken: JWTToken;
// 		refreshToken: JWTToken;
// 		expiresIn: number;
// 		userInformation: UserInformation;
// 		grants: string[];
// 	}
// }
