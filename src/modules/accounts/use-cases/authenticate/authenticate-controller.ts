// import { container } from "tsyringe";

// import { Controller, type HttpResponse, ok } from "@/shared/application";
// import { SaveLogs } from "@/shared/application/save-logs";

// import { AuthenticateUseCase } from "./authenticate-use-case";
// import type { DTOAuthenticateController } from "./authenticate.types";

// class AuthenticateController extends Controller {
// 	async handle(
// 		request: DTOAuthenticateController.Input,
// 	): Promise<HttpResponse> {
// 		SaveLogs.ControllerTitle("AuthenticateController (handle)");

// 		const { email, password } = request;

// 		const authUseCase = container.resolve(AuthenticateUseCase);
// 		const newToken = await authUseCase.execute({
// 			email,
// 			password,
// 		});

// 		const output: DTOAuthenticateController.Output = { ...newToken };

// 		return ok(output);
// 	}
// }

// export { AuthenticateController };
