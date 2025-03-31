const stringify = (string) => {
    return JSON.stringify(string, null, 2);
};
import { lightGreen, lightMagenta, lightRed, lightYellow, white, } from "./ansi-colors.js";
import { logger } from "./logger.js";
class SaveLogs {
    static ProviderSuccess(name) {
        logger.info(lightGreen, `[controller] ${name}`);
    }
    static ControllerTitle(name) {
        logger.info(lightYellow, `[controller] ${name}`);
    }
    static UseCaseTitle(name) {
        logger.info(lightYellow, `[use_case] ${name}`);
    }
    static UseCaseFunction(name) {
        logger.info(lightMagenta, `[use_case] ${name}`);
    }
    static RepositoryTitle(name) {
        logger.info(lightYellow, `[repository] ${name}`);
    }
    static ProviderTitle(name) {
        logger.info(lightYellow, `[provider] ${name}`);
    }
    static ExpressInput(request) {
        logger.info(lightYellow, `[express] Request: ${request.method} ${request.baseUrl} ${request.url}`);
    }
    static ExpressOutput(status) {
        logger.info(lightGreen, `[express] Response: status code ${status}`);
        logger.info(white, "\n--------------------------------------------------\n");
    }
    static ErrorHandler(status, message) {
        logger.error(lightRed, `[express] Error: status code ${status}`);
        logger.error(lightRed, `[express] Error: ${stringify(message)}`);
        logger.error(white, "\n--------------------------------------------------\n");
    }
    static MiddlewareTitle(name) {
        logger.info(lightYellow, `[middleware] ${name}`);
    }
}
export { SaveLogs };
//# sourceMappingURL=save-logs.js.map