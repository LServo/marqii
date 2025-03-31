// import { container } from "tsyringe";

// import { Controller, type HttpResponse, noContent } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save-logs";

// import { AuthenticateClearUseCase } from "./authenticate-clear-use-case";
// import type { DTOAuthenticateClearController } from "./authenticate-clear.types";

// class AuthenticateClearController extends Controller {
// 	async handle(
// 		request: DTOAuthenticateClearController.Input,
// 	): Promise<HttpResponse> {
// 		SaveLogs.ControllerTitle("AuthenticateClearController (handle)");

// 		const { accessToken } = request;

// 		const authenticateClearUseCase = container.resolve(
// 			AuthenticateClearUseCase,
// 		);

// 		await authenticateClearUseCase.execute({
// 			accessToken,
// 		});

// 		return noContent();
// 	}
// }

// export { AuthenticateClearController };
