import { container } from "tsyringe";
import JwtProvider from "./implementations/JwtProvider.js";
const jwtProvider = container.resolve(JwtProvider);
container.registerInstance("JwtProvider", jwtProvider);
//# sourceMappingURL=index.js.map