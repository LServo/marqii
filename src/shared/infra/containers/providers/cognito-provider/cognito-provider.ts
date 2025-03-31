import crypto from "node:crypto";
import { serverError } from "@/shared/application/index.js";
import { logger } from "@/shared/application/logger.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import type { JWTToken } from "@/shared/main/@types/index.js";
import {
	AdminCreateUserCommand,
	AdminDisableUserCommand,
	AdminEnableUserCommand,
	AdminGetUserCommand,
	AdminInitiateAuthCommand,
	AdminSetUserPasswordCommand,
	AdminUpdateUserAttributesCommand,
	CognitoIdentityProviderClient,
	GetUserCommand,
	GlobalSignOutCommand,
	InitiateAuthCommand,
	UpdateUserPoolCommand,
	type UpdateUserPoolCommandInput,
	type UserStatusType,
} from "@aws-sdk/client-cognito-identity-provider";

import { env } from "node:process";
import type { ICognitoProvider } from "./cognito-provider.interface.js";
import type {
	AdminCreateUser,
	AdminUpdateUserAttributes,
	AuthLogin,
	ConfirmNewPassword,
	DisableUser,
	EnableUser,
	GetUser,
	Logoff,
	SetupPoolConfigs,
} from "./cognito-provider.types.js";

export class CognitoProvider implements ICognitoProvider {
	protected cognitoClient: CognitoIdentityProviderClient;
	private readonly userPoolId: string;
	private readonly clientId: string;
	private readonly clientSecret: string;

	constructor() {
		this.cognitoClient = new CognitoIdentityProviderClient({
			region: env.AWS_REGION,
			credentials: {
				accessKeyId: env.AWS_COGNITO_ID,
				secretAccessKey: env.AWS_COGNITO_SECRET,
			},
		});
		this.userPoolId = env.AWS_COGNITO_POOL_ID;
		this.clientId = env.AWS_COGNITO_CLIENT_ID;
		this.clientSecret = env.AWS_COGNITO_CLIENT_SECRET;
	}

	async authLogin({
		email,
		password,
	}: AuthLogin.Input): Promise<AuthLogin.Output> {
		SaveLogs.ProviderTitle("CognitoProvider (authLogin)");

		const secretHash = this.generateSecretHash(
			email,
			this.clientId,
			this.clientSecret,
		);

		const command = new AdminInitiateAuthCommand({
			UserPoolId: this.userPoolId,
			ClientId: this.clientId,
			AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password,
				SECRET_HASH: secretHash,
			},
		});

		const response = await this.cognitoClient.send(command);

		SaveLogs.ProviderSuccess("CognitoProvider (authLogin)");

		return {
			accessToken: response?.AuthenticationResult?.AccessToken as JWTToken,
			expiresIn: response?.AuthenticationResult?.ExpiresIn,
		};
	}

	async confirmNewPassword({
		email,
		password,
		newPassword,
	}: ConfirmNewPassword.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (confirmNewPassword)");

		const secretHash = this.generateSecretHash(
			email,
			this.clientId,
			this.clientSecret,
		);

		const command = new AdminInitiateAuthCommand({
			UserPoolId: this.userPoolId,
			ClientId: this.clientId,
			AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password,
				SECRET_HASH: secretHash,
			},
		});

		await this.cognitoClient.send(command);

		const command2 = new AdminSetUserPasswordCommand({
			UserPoolId: this.userPoolId,
			Username: email,
			Password: newPassword,
			Permanent: true,
		});

		await this.cognitoClient.send(command2);

		SaveLogs.ProviderSuccess("CognitoProvider (confirmNewPassword)");
	}

	async adminUpdateUserAttributes({
		username,
		userAttributes,
	}: AdminUpdateUserAttributes.Input): Promise<AdminUpdateUserAttributes.Output> {
		SaveLogs.ProviderTitle("CognitoProvider (adminUpdateUserAttributes)");

		const command = new AdminUpdateUserAttributesCommand({
			UserPoolId: this.userPoolId,
			Username: username,
			UserAttributes: userAttributes,
		});

		try {
			await this.cognitoClient.send(command);
		} catch (error) {
			throw serverError({ error });
		}

		SaveLogs.ProviderSuccess("CognitoProvider (adminUpdateUserAttributes)");
	}

	async adminCreateUser({
		username,
		userAttributes,
	}: AdminCreateUser.Input): Promise<AdminCreateUser.Output> {
		SaveLogs.ProviderTitle("CognitoProvider (adminCreateUser)");

		const command = new AdminCreateUserCommand({
			UserPoolId: this.userPoolId,
			Username: username,
			UserAttributes: userAttributes,
			DesiredDeliveryMediums: ["EMAIL"],
			TemporaryPassword: this.generatePassword(),
		});

		const response = await this.cognitoClient.send(command);

		SaveLogs.ProviderSuccess("CognitoProvider (adminCreateUser)");

		return {
			username: response.User?.Username || "",
			userStatus: response.User.UserStatus as UserStatusType,
		};
	}

	async logoff({ accessToken }: Logoff.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (logoff)");

		const params = {
			AccessToken: accessToken,
		};

		await this.validateAccessToken({ accessToken });

		const command = new GlobalSignOutCommand(params);

		await this.cognitoClient.send(command);

		SaveLogs.ProviderSuccess("CognitoProvider (logoff)");
	}

	async validateAccessToken({ accessToken }: Logoff.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (validateAccessToken)");

		const params = {
			AccessToken: accessToken,
		};

		const command = new GetUserCommand(params);

		await this.cognitoClient.send(command);

		SaveLogs.ProviderSuccess("CognitoProvider (validateAccessToken)");
	}

	async getUser({ username }: GetUser.Input): Promise<GetUser.Output> {
		SaveLogs.ProviderTitle("CognitoProvider (getUser)");

		const params = {
			Username: username,
			UserPoolId: this.userPoolId,
		};

		const command = new AdminGetUserCommand(params);

		const response = await this.cognitoClient.send(command);

		const user: GetUser.User = {
			Username: response.Username,
			UserAttributes: response.UserAttributes.map((attr) => ({
				Name: attr.Name,
				Value: attr.Value,
			})),
			UserCreateDate: new Date(response.UserCreateDate),
			UserLastModifiedDate: new Date(response.UserLastModifiedDate),
			Enabled: response.Enabled,
			UserStatus: response.UserStatus,
			MFAOptions: response?.MFAOptions?.map((option) => ({
				DeliveryMedium: option.DeliveryMedium,
				AttributeName: option.AttributeName,
			})),
		};

		SaveLogs.ProviderSuccess("CognitoProvider (getUser)");

		return user;
	}

	async disableUser({ username }: DisableUser.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (disableUser)");

		const command = new AdminDisableUserCommand({
			UserPoolId: this.userPoolId,
			Username: username,
		});

		await this.cognitoClient.send(command);

		SaveLogs.ProviderSuccess("CognitoProvider (disableUser)");
	}

	async enableUser({ username }: EnableUser.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (enableUser)");
		const command = new AdminEnableUserCommand({
			UserPoolId: this.userPoolId,
			Username: username,
		});

		const result = await this.cognitoClient.send(command);

		logger.info(`result: ${result}`);

		SaveLogs.ProviderSuccess("CognitoProvider (enableUser)");
	}

	async setupPoolConfigs({
		inviteTemplate,
		verifyTemplate,
	}: SetupPoolConfigs.Input): Promise<void> {
		SaveLogs.ProviderTitle("CognitoProvider (SetupPoolConfigs)");

		const params = {
			UserPoolId: this.userPoolId,
			AdminCreateUserConfig: {
				AllowAdminCreateUserOnly: false, // Defina como true se deseja que apenas administradores possam criar usuários
				InviteMessageTemplate: {
					EmailMessage: inviteTemplate,
					EmailSubject: "Convite de acesso ao GEDOTT",
				},
			},
			VerificationMessageTemplate: {
				DefaultEmailOption: "CONFIRM_WITH_CODE", // Opções: CONFIRM_WITH_CODE | CONFIRM_WITH_LINK | CONFIRM_WITH_ADMIN_USER
				EmailMessage: verifyTemplate,
				EmailSubject: "Your verification code",
			},
			AutoVerifiedAttributes: ["email"], // Defina os atributos que serão verificados automaticamente
			EmailConfiguration: {
				// CONFIGURAÇÕES SANDBOX
				EmailSendingAccount: "COGNITO_DEFAULT",
				// SourceArn:
				// 	"arn:aws:ses:sa-east-1:423521828233:identity/projetosgdot.rs@paipe.co",
			},
			DeletionProtection: "ACTIVE",
		} satisfies UpdateUserPoolCommandInput;

		const command = new UpdateUserPoolCommand(params);

		try {
			await this.cognitoClient.send(command);
			logger.info(
				`Pool de Usuários do AWS Cognito configurada com sucesso! (${this.userPoolId})`,
			);
		} catch (error) {
			logger.error(`Erro ao configurar Pool de Usuários: ${error}`);
		}
	}

	private generatePassword(): string {
		const specialChars = "!@#$%^&*():;<>?/.,";
		const numbers = "0123456789";
		const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
		const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		let password = "";
		password += specialChars[Math.floor(Math.random() * specialChars.length)];
		password += numbers[Math.floor(Math.random() * numbers.length)];
		password +=
			lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
		password +=
			upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];

		while (password.length < 8) {
			const allChars =
				specialChars + numbers + lowerCaseLetters + upperCaseLetters;
			password += allChars[Math.floor(Math.random() * allChars.length)];
		}

		return password
			.split("")
			.sort(() => Math.random() - 0.5)
			.join("");
	}

	private generateSecretHash(
		username: string,
		clientId: string,
		clientSecret: string,
	): string {
		return crypto
			.createHmac("SHA256", clientSecret)
			.update(username + clientId)
			.digest("base64");
	}
}
