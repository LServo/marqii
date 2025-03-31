import { container } from "tsyringe";
import { CognitoProvider } from "./cognito-provider.js";
const cognitoProvider = container.resolve(CognitoProvider);
container.registerInstance("CognitoProvider", cognitoProvider);
//# sourceMappingURL=index.js.map