import jwt from "jsonwebtoken";

import { SaveLogs } from "@/shared/application/save-logs.js";

import type { IJwtProvider } from "../IJwtProvider.js";
import type { Decode, GenerateToken, Verify } from "../jwtProvider.types.js";

class JwtProvider implements IJwtProvider {
	private secretKey: string = process.env.JWT_SECRET || "1h";

	decode({ token }: Decode.Input): Decode.Output {
		SaveLogs.ProviderTitle("JwtProvider (decode)");

		return jwt.decode(token) as Decode.Output;
	}

	verify({ token }: Verify.Input): Verify.Output {
		SaveLogs.ProviderTitle("JwtProvider (verify)");

		return jwt.verify(token, this.secretKey) as Verify.Output;
	}

	generateToken({
		payload,
		expiresIn,
	}: GenerateToken.Input): GenerateToken.Output {
		SaveLogs.ProviderTitle("JwtProvider (generateToken)");

		const token = jwt.sign(
			payload as string | object | Buffer,
			this.secretKey,
			{
				expiresIn,
			},
		);

		return { jwtToken: token } as GenerateToken.Output;
	}
}

export default JwtProvider;
