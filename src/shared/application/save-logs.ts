import type { Request } from "express";

const stringify = (string: unknown) => {
	return JSON.stringify(string, null, 2);
};

import {
	lightGreen,
	lightMagenta,
	lightRed,
	lightYellow,
	white,
} from "./ansi-colors.js";
import { logger } from "./logger.js";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class SaveLogs {
	static ProviderSuccess(name: string) {
		logger.info(lightGreen, `[controller] ${name}`);
	}
	static ControllerTitle(name: string) {
		logger.info(lightYellow, `[controller] ${name}`);
	}

	static UseCaseTitle(name: string) {
		logger.info(lightYellow, `[use_case] ${name}`);
	}

	static UseCaseFunction(name: string) {
		logger.info(lightMagenta, `[use_case] ${name}`);
	}

	static RepositoryTitle(name: string) {
		logger.info(lightYellow, `[repository] ${name}`);
	}

	static ProviderTitle(name: string) {
		logger.info(lightYellow, `[provider] ${name}`);
	}

	static ExpressInput(request: Request) {
		logger.info(
			lightYellow,
			`[express] Request: ${request.method} ${request.baseUrl} ${request.url}`,
		);
	}

	static ExpressOutput(status: number) {
		logger.info(lightGreen, `[express] Response: status code ${status}`);
		logger.info(
			white,
			"\n--------------------------------------------------\n",
		);
	}

	static ErrorHandler(status: number, message: unknown) {
		logger.error(lightRed, `[express] Error: status code ${status}`);
		logger.error(lightRed, `[express] Error: ${stringify(message)}`);
		logger.error(
			white,
			"\n--------------------------------------------------\n",
		);
	}

	static MiddlewareTitle(name: string) {
		logger.info(lightYellow, `[middleware] ${name}`);
	}
}

export { SaveLogs };
