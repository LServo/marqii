// import { container } from 'tsyringe';

// import mail from '@/shared/application/mail';

// import { CognitoProvider } from '../../container/providers/CognitoProvider/implementations/CognitoProvider';
// import { SESProvider } from '../../container/providers/SESProvider/implementations/SESProvider';

// export const setupCognitoUserPool = async () => {
//     const isLocal =
//         process.env.NODE_ENV === 'local' || process.env.LOCAL === 'true';

//     if (!isLocal) {
//         const sesProvider = container.resolve(SESProvider);
//         const cognitoProvider = container.resolve(CognitoProvider);

//         const inviteTemplate = await sesProvider.insertEmailVariables({
//             path: 'src/shared/infra/settings/aws-cognito/invite.hbs',
//             variables: {
//                 siteUrl: mail.app_login_url,
//                 googlePlayUrl:
//                     'https://play.google.com/store/apps/details?id=br.com.gedott',
//                 appStoreUrl:
//                     'https://apps.apple.com/br/app/gedott/id1581060733',
//                 googlePlayLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/google-play.png',
//                 appStoreLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/app-store.png',
//                 gedottLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/logo.png',
//                 password: '{####}',
//                 username: '{username}',
//             },
//         });

//         const verifyTemplate = await sesProvider.insertEmailVariables({
//             path: 'src/shared/infra/settings/aws-cognito/recovery-password.hbs',
//             variables: {
//                 siteUrl: mail.app_login_url,
//                 googlePlayUrl:
//                     'https://play.google.com/store/apps/details?id=br.com.gedott',
//                 appStoreUrl:
//                     'https://apps.apple.com/br/app/gedott/id1581060733',
//                 googlePlayLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/google-play.png',
//                 appStoreLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/app-store.png',
//                 gedottLogo:
//                     'https://sgdot-email-images.s3.amazonaws.com/logo.png',
//                 tempPassword: '{####}',
//             },
//         });

//         await cognitoProvider.setupPoolConfigs({
//             inviteTemplate,
//             verifyTemplate,
//         });
//     }
// };
