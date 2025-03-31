import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { container } from "tsyringe";
import { CognitoProvider } from "../../containers/providers/cognito-provider/cognito-provider.js";

export const setupCognitoUserPool = async () => {
	const isLocal =
		process.env.NODE_ENV === "local" || process.env.LOCAL === "true";

	if (!isLocal) {
		const cognitoProvider = container.resolve(CognitoProvider);

		const inviteTemplate = readFileSync(
			resolve("src/shared/infra/settings/aws-cognito/invite.hbs"),
			"utf-8",
		);
		const verifyTemplate = readFileSync(
			resolve("src/shared/infra/settings/aws-cognito/recovery-password.hbs"),
			"utf-8",
		);

		await cognitoProvider.setupPoolConfigs({
			inviteTemplate,
			verifyTemplate,
		});
	}
};
