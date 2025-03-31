import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { container } from "tsyringe";

import { lightRed } from "@/shared/application/ansi-colors.js";
import { unauthorized } from "@/shared/application/index.js";
import { logger } from "@/shared/application/logger.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import JwtProvider from "@/shared/infra/containers/providers/jwt-provider/jwt-provider.js";

import { env } from "node:process";
import type { JWTToken, UUID } from "../@types/index.js";

/**
 * @description Middleware to validate the user's access token
 * @operational Returns unauthorized if the token is not valid
 */
export async function validateAuth(
	request: Request,
	_response: Response,
	next: NextFunction,
) {
	SaveLogs.MiddlewareTitle("validateAuth");

	const hasBearer = request.headers.authorization;
	if (!hasBearer) throw unauthorized({ error_code: "TOKEN_NOT_FOUND" });

	try {
		const jwtProvider = container.resolve(JwtProvider);

		const token = hasBearer.split("Bearer ")[1];
		const jwtDecoded = jwtProvider.decode({
			token: (token || hasBearer) as JWTToken,
		});

		// Verifier that expects valid access tokens:
		const verifier = CognitoJwtVerifier.create({
			userPoolId: env.AWS_COGNITO_POOL_ID,
			tokenUse: "access",
			clientId: env.AWS_COGNITO_CLIENT_ID,
		});

		await verifier.verify(jwtDecoded?.accessToken);
		request.user = {
			id: jwtDecoded.userId as UUID,
			accessToken: token,
		};
	} catch (error) {
		logger.error(lightRed, error);
		throw unauthorized({ error_code: "INVALID_TOKEN" });
	}

	next();
}
