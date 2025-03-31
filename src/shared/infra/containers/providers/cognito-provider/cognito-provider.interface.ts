import type {
	AdminCreateUser,
	AdminResetUserPassword,
	AdminUpdateUserAttributes,
	AuthLogin,
	ConfirmNewPassword,
	DisableUser,
	EnableUser,
	GetUser,
	Logoff,
	RefreshTokenResponse,
	SetupPoolConfigs,
} from "./cognito-provider.types.js";

export interface ICognitoProvider {
	/**
	 * @description Método para autenticar um usuário utilizando o Cognito
	 * @param email Email do usuário
	 * @param password Senha do usuário
	 * @returns Retorna as informações necessárias para autenticação do usuário
	 */
	authLogin({ email, password }: AuthLogin.Input): Promise<AuthLogin.Output>;

	/**
	 * @description Método para confirmar a nova senha de um usuário
	 * @operational
	 *  - Recebe a senha atual, faz a autenticação do usuário e depois altera a senha
	 * @param email Email do usuário
	 * @param password Senha atual do usuário
	 * @param newPassword Nova senha do usuário
	 * @returns Retorna void
	 */
	confirmNewPassword({
		email,
		password,
		newPassword,
	}: ConfirmNewPassword.Input): Promise<void>;

	/**
	 * @description Método para atualizar os atributos de um usuário. Utilizado - por exemplo - para atualizar o email do usuário
	 * @param username Username do usuário
	 * @param userAttributes Atributos do usuário
	 * @returns Retorna void
	 */
	adminUpdateUserAttributes({
		username,
		userAttributes,
	}: AdminUpdateUserAttributes.Input): Promise<AdminUpdateUserAttributes.Output>;

	/**
	 * @description Método para criar um usuário
	 * @param username Username do usuário
	 * @param userAttributes Atributos do usuário
	 * @returns Retorna as informações relevantes do usuário criado no Cognito
	 */
	adminCreateUser({
		username,
		userAttributes,
	}: AdminCreateUser.Input): Promise<AdminCreateUser.Output>;

	/**
	 * @description Método para deslogar um usuário
	 * @param accessToken Token de acesso do usuário
	 * @returns Retorna void
	 */
	logoff({ accessToken }: Logoff.Input): Promise<void>;

	/**
	 * @description Método para buscar um usuário
	 * @param username Username do usuário
	 * @returns Retorna as informações do usuário do Cognito
	 */
	getUser({ username }: GetUser.Input): Promise<GetUser.Output>;

	/**
	 * @description Método para desabilitar um usuário
	 * @param username Username do usuário
	 * @returns Retorna void
	 */
	disableUser({ username }: DisableUser.Input): Promise<void>;

	/**
	 * @description Método para habilitar um usuário
	 * @param username Username do usuário
	 * @returns Retorna void
	 */
	enableUser({ username }: EnableUser.Input): Promise<void>;

	setupPoolConfigs({
		inviteTemplate,
		verifyTemplate,
	}: SetupPoolConfigs.Input): Promise<void>;
}
