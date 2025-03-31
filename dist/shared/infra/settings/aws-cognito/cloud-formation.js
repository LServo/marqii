import * as cdk from "aws-cdk-lib";
import { AccountRecovery, UserPool, VerificationEmailStyle, } from "aws-cdk-lib/aws-cognito";
export class CognitoStack extends cdk.Stack {
    userPool;
    userPoolClient;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.userPool = new UserPool(this, "MyUserPool", {
            userPoolName: "my-api-user-pool",
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
            },
            autoVerify: {
                email: true,
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true,
                },
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireDigits: true,
                requireUppercase: true,
                requireSymbols: false,
            },
            email: cdk.aws_cognito.UserPoolEmail.withCognito("l.servo@hotmail.com"),
            userVerification: {
                emailSubject: "Verifique seu e-mail",
                emailBody: "Olá {username}, use o código {####} para verificar seu e-mail.",
                emailStyle: VerificationEmailStyle.CODE,
            },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        this.userPoolClient = this.userPool.addClient("MyUserPoolClient", {
            userPoolClientName: "my-api-client",
            authFlows: {
                userPassword: true,
                userSrp: true,
            },
        });
        new cdk.CfnOutput(this, "UserPoolId", {
            value: this.userPool.userPoolId,
        });
        new cdk.CfnOutput(this, "UserPoolClientId", {
            value: this.userPoolClient.userPoolClientId,
        });
    }
}
//# sourceMappingURL=cloud-formation.js.map