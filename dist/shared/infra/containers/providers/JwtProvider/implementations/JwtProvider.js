import jwt from "jsonwebtoken";
import { SaveLogs } from "../../../../../../shared/application/save-logs.js";
class JwtProvider {
    secretKey = process.env.JWT_SECRET || "1h";
    decode({ token }) {
        SaveLogs.ProviderTitle("JwtProvider (decode)");
        return jwt.decode(token);
    }
    verify({ token }) {
        SaveLogs.ProviderTitle("JwtProvider (verify)");
        return jwt.verify(token, this.secretKey);
    }
    generateToken({ payload, expiresIn, }) {
        SaveLogs.ProviderTitle("JwtProvider (generateToken)");
        const token = jwt.sign(payload, this.secretKey, {
            expiresIn,
        });
        return { jwtToken: token };
    }
}
export default JwtProvider;
//# sourceMappingURL=JwtProvider.js.map