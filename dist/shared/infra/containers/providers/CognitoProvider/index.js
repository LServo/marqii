import { container } from "tsyringe";
import { CognitoProvider } from "./implementations/CognitoProvider.js";
const cognitoProvider = container.resolve(CognitoProvider);
container.registerInstance("CognitoProvider", cognitoProvider);
//# sourceMappingURL=index.js.map