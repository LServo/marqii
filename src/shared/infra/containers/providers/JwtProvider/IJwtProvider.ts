import type { Decode, GenerateToken, Verify } from "./jwtProvider.types.js";

export interface IJwtProvider {
	/**
	 * @description Método para decodificar um token
	 * @param token Token a ser decodificado
	 * @returns Retorna as informações contidas no token
	 */
	decode({ token }: Decode.Input): Decode.Output;

	/**\
	 * @description Método para verificar a validade de um token
	 * @param token Token a ser verificado
	 * @returns Retorna true se o token for válido e false se o token for inválido
	 */
	verify({ token }: Verify.Input): Verify.Output;

	/**
	 * @description Método para gerar um token
	 * @param payload Payload a ser inserido no token
	 * @param expiresIn Tempo de expiração do token
	 */
	generateToken({
		payload,
		expiresIn,
	}: GenerateToken.Input): GenerateToken.Output;
}
