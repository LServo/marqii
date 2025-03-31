import { container } from "tsyringe";

import type { ICognitoProvider } from "./ICognitoProvider.js";
import { CognitoProvider } from "./implementations/CognitoProvider.js";

const cognitoProvider = container.resolve(CognitoProvider);

container.registerInstance<ICognitoProvider>(
	"CognitoProvider",
	cognitoProvider,
);
