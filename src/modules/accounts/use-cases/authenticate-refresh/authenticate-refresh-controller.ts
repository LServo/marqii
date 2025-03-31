// import { container } from "tsyringe";

// import { Controller, type HttpResponse, ok } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save_logs";

// import { AuthenticateRefreshUseCase } from "./authenticate-refresh-use-case";
// import type { DTOAuthenticateRefreshController } from "./authenticate-refresh.types";

// class AuthenticateRefreshController extends Controller {
// 	async handle(
// 		request: DTOAuthenticateRefreshController.Input,
// 	): Promise<HttpResponse<DTOAuthenticateRefreshController.Output>> {
// 		SaveLogs.ControllerTitle("AuthenticateRefreshController (handle)");

// 		const authenticateRefreshUseCase = container.resolve(
// 			AuthenticateRefreshUseCase,
// 		);

// 		const response = await authenticateRefreshUseCase.execute({
// 			...request,
// 		});

// 		return ok(response);
// 	}
// }

// export { AuthenticateRefreshController };
