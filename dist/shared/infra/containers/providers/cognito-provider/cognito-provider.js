import { serverError } from "../../../../../shared/application/index.js";
import { logger } from "../../../../../shared/application/logger.js";
import { SaveLogs } from "../../../../../shared/application/save-logs.js";
import { AdminCreateUserCommand, AdminDisableUserCommand, AdminEnableUserCommand, AdminGetUserCommand, AdminInitiateAuthCommand, AdminSetUserPasswordCommand, AdminUpdateUserAttributesCommand, CognitoIdentityProviderClient, GetUserCommand, GlobalSignOutCommand, InitiateAuthCommand, UpdateUserPoolCommand, } from "@aws-sdk/client-cognito-identity-provider";
export class CognitoProvider {
    cognitoClient;
    userPoolId;
    clientId;
    constructor() {
        this.cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_COGNITO_ID,
                secretAccessKey: process.env.AWS_COGNITO_SECRET,
            },
        });
        this.userPoolId = process.env.AWS_COGNITO_POOL_ID;
        this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
    }
    async authLogin({ email, password, }) {
        SaveLogs.ProviderTitle("CognitoProvider (authLogin)");
        const command = new AdminInitiateAuthCommand({
            UserPoolId: this.userPoolId,
            ClientId: this.clientId,
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        });
        const response = await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (authLogin)");
        return {
            accessToken: response?.AuthenticationResult?.AccessToken,
            refreshToken: response?.AuthenticationResult?.RefreshToken,
            expiresIn: response?.AuthenticationResult?.ExpiresIn,
        };
    }
    async confirmNewPassword({ email, password, newPassword, }) {
        SaveLogs.ProviderTitle("CognitoProvider (confirmNewPassword)");
        const command = new AdminInitiateAuthCommand({
            UserPoolId: this.userPoolId,
            ClientId: this.clientId,
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
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
    async refreshToken({ refreshToken, }) {
        SaveLogs.ProviderTitle("CognitoProvider (refreshToken)");
        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            ClientId: this.clientId,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
        });
        const response = await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (refreshToken)");
        return {
            accessToken: (response.AuthenticationResult?.AccessToken ||
                ""),
            refreshToken: (response.AuthenticationResult?.IdToken || ""),
            expiresIn: response.AuthenticationResult?.ExpiresIn || 0,
        };
    }
    async adminUpdateUserAttributes({ username, userAttributes, }) {
        SaveLogs.ProviderTitle("CognitoProvider (adminUpdateUserAttributes)");
        const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            UserAttributes: userAttributes,
        });
        try {
            await this.cognitoClient.send(command);
        }
        catch (error) {
            throw serverError({ error });
        }
        SaveLogs.ProviderSuccess("CognitoProvider (adminUpdateUserAttributes)");
    }
    async adminResetUserPassword({ userName, tempPassword, }) {
        SaveLogs.ProviderTitle("CognitoProvider (adminResetUserPassword)");
        const command = new AdminSetUserPasswordCommand({
            UserPoolId: this.userPoolId,
            Username: userName,
            Password: tempPassword,
            Permanent: false,
        });
        await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (adminResetUserPassword)");
    }
    async adminCreateUser({ username, userAttributes, }) {
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
            userStatus: response.User.UserStatus,
        };
    }
    async logoff({ accessToken }) {
        SaveLogs.ProviderTitle("CognitoProvider (logoff)");
        const params = {
            AccessToken: accessToken,
        };
        await this.validateAccessToken({ accessToken });
        const command = new GlobalSignOutCommand(params);
        await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (logoff)");
    }
    async validateAccessToken({ accessToken }) {
        SaveLogs.ProviderTitle("CognitoProvider (validateAccessToken)");
        const params = {
            AccessToken: accessToken,
        };
        const command = new GetUserCommand(params);
        await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (validateAccessToken)");
    }
    async getUser({ username }) {
        SaveLogs.ProviderTitle("CognitoProvider (getUser)");
        const params = {
            Username: username,
            UserPoolId: this.userPoolId,
        };
        const command = new AdminGetUserCommand(params);
        const response = await this.cognitoClient.send(command);
        const user = {
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
    async disableUser({ username }) {
        SaveLogs.ProviderTitle("CognitoProvider (disableUser)");
        const command = new AdminDisableUserCommand({
            UserPoolId: this.userPoolId,
            Username: username,
        });
        await this.cognitoClient.send(command);
        SaveLogs.ProviderSuccess("CognitoProvider (disableUser)");
    }
    async enableUser({ username }) {
        SaveLogs.ProviderTitle("CognitoProvider (enableUser)");
        const command = new AdminEnableUserCommand({
            UserPoolId: this.userPoolId,
            Username: username,
        });
        const result = await this.cognitoClient.send(command);
        logger.info(`result: ${result}`);
        SaveLogs.ProviderSuccess("CognitoProvider (enableUser)");
    }
    async setupPoolConfigs({ inviteTemplate, verifyTemplate, }) {
        SaveLogs.ProviderTitle("CognitoProvider (SetupPoolConfigs)");
        const params = {
            UserPoolId: this.userPoolId,
            AdminCreateUserConfig: {
                AllowAdminCreateUserOnly: false,
                InviteMessageTemplate: {
                    EmailMessage: inviteTemplate,
                    EmailSubject: "Convite de acesso ao GEDOTT",
                },
            },
            VerificationMessageTemplate: {
                DefaultEmailOption: "CONFIRM_WITH_CODE",
                EmailMessage: verifyTemplate,
                EmailSubject: "Your verification code",
            },
            AutoVerifiedAttributes: ["email"],
            EmailConfiguration: {
                EmailSendingAccount: "COGNITO_DEFAULT",
                SourceArn: "arn:aws:ses:sa-east-1:423521828233:identity/projetosgdot.rs@paipe.co",
            },
            DeletionProtection: "ACTIVE",
        };
        const command = new UpdateUserPoolCommand(params);
        try {
            await this.cognitoClient.send(command);
            logger.info(`Pool de Usuários do AWS Cognito configurada com sucesso! (${this.userPoolId})`);
        }
        catch (error) {
            logger.error(`Erro ao configurar Pool de Usuários: ${error}`);
        }
    }
    generatePassword() {
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
            const allChars = specialChars + numbers + lowerCaseLetters + upperCaseLetters;
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }
}
//# sourceMappingURL=cognito-provider.js.map