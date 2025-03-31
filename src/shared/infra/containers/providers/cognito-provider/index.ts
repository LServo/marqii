import { container } from "tsyringe";

import type { ICognitoProvider } from "./cognito-provider.interface.js";
import { CognitoProvider } from "./cognito-provider.js";

const cognitoProvider = container.resolve(CognitoProvider);

container.registerInstance<ICognitoProvider>(
	"CognitoProvider",
	cognitoProvider,
);
