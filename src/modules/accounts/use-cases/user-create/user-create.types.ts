import type { HttpResponse, RequestInput } from "@/shared/application/index.js";
import type {
	UserEntityInput,
	UserEntityOutput,
} from "../../infra/domain/User.entity.js";

export namespace DTOUserCreateController {
	export interface Input
		extends RequestInput,
			Omit<UserEntityInput, "idProvider"> {}

	type ControllerResponse = UserEntityOutput;

	export interface Output extends HttpResponse<ControllerResponse> {}
}

export namespace DTOUserCreateUseCase {
	export interface Input extends Omit<UserEntityInput, "idProvider"> {}

	export interface Output extends UserEntityOutput {}
}
