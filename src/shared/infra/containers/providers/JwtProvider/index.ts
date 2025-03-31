import { container } from "tsyringe";

import type { IJwtProvider } from "./IJwtProvider.js";
import JwtProvider from "./implementations/JwtProvider.js";

const jwtProvider = container.resolve(JwtProvider);

container.registerInstance<IJwtProvider>("JwtProvider", jwtProvider);
