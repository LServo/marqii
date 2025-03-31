import { container } from "tsyringe";

import type { IJwtProvider } from "./jwt-provider.interface.js";
import JwtProvider from "./jwt-provider.js";

const jwtProvider = container.resolve(JwtProvider);

container.registerInstance<IJwtProvider>("JwtProvider", jwtProvider);
