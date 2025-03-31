import type { HttpResponse } from "./http-responses.js";

export interface RequestInput {
	[key: string]: unknown;
	userContext: Express.Request["user"];
}

export abstract class Controller {
	abstract handle(httpRequest: RequestInput): Promise<HttpResponse>;

	async execute(httpRequest: RequestInput): Promise<HttpResponse> {
		return await this.handle(httpRequest);
	}
}
