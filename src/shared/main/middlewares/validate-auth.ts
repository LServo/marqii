// import { NextFunction, Request, RequestHandler, Response } from 'express';

// import { unauthorized } from '@/shared/application';
// import { logger } from '@/shared/application/logger';
// import { RouteRules } from '@/shared/application/route_rules';
// import { SaveLogs } from '@/shared/application/save_logs';
// import { AuthProvider } from '@/shared/infra/container/providers/AuthProvider/implementations/AuthProvider';
// import JwtProvider from '@/shared/infra/container/providers/JwtProvider/implementations/JwtProvider';
// import { redisUserRepository } from '@/shared/infra/database/redis/repositories';
// import { mockUsersLevels } from '@/shared/infra/database/seeds/mock-users-levels';
// import { AccountInfo } from '@azure/msal-node';

// import { middlewareErrorMessages } from '.';
// import { JWTToken, UUID } from '../@types';

// type Middleware = (validationRules: RouteRules) => RequestHandler;

// /**
//  * @description Middleware to validate the user's access token
//  * @operational Returns unauthorized if the token is not valid
//  */
// export const validateAuth: Middleware =
//     () => async (request: Request, _response: Response, next: NextFunction) => {
//         SaveLogs.MiddlewareTitle('validateAuth');

//         const authorization = request.headers.authorization;
//         if (!authorization)
//             throw unauthorized({
//                 error_code: 'TOKEN_NOT_FOUND',
//                 error_msgs: middlewareErrorMessages,
//             });

//         const extractedToken = authorization.split(' ')[1];
//         const decodedToken = JwtProvider.verify<{ user_id: UUID }>({
//             token: extractedToken as JWTToken,
//         });
//         if (!decodedToken) {
//             throw unauthorized({
//                 error_code: 'TOKEN_NOT_FOUND',
//                 error_msgs: middlewareErrorMessages,
//             });
//         }

//         const mockUsersLevelsIds = mockUsersLevels.map((user) => user.id);
//         if (mockUsersLevelsIds.includes(decodedToken.user_id)) {
//             request.user.id = decodedToken.user_id;
//             next();
//             return;
//         }

//         const redisUser = await redisUserRepository.fetch(decodedToken.user_id);
//         if (!redisUser || !redisUser.auth_jwt_token) {
//             throw unauthorized({
//                 error_code: 'TOKEN_NOT_FOUND',
//                 error_msgs: middlewareErrorMessages,
//             });
//         }

//         const payload = JwtProvider.verify<{
//             account: AccountInfo;
//             accessToken: JWTToken;
//             tokenCache: string;
//         }>({
//             token: redisUser.auth_jwt_token as JWTToken,
//         });

//         const authProvider = new AuthProvider();
//         const tokenInfos = await authProvider.validateAndRefreshToken({
//             account: payload.account,
//             tokenCache: payload.tokenCache,
//         });

//         const { account, accessToken } = tokenInfos.response;
//         const tokenCache = tokenInfos.tokenCache;

//         const NineThousandYears = 60 * 60 * 24 * 365 * 1000;

//         const { jwtToken } = JwtProvider.generateToken({
//             payload: {
//                 account,
//                 accessToken,
//                 tokenCache,
//             },
//             expiresIn: NineThousandYears,
//         });

//         if (jwtToken)
//             request.auth = {
//                 token: jwtToken,
//             };

//         request.user.id = decodedToken.user_id;

//         logger.info(`User ID: ${request.user.id}`);

//         next();
//     };
