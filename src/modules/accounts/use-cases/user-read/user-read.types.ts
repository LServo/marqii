import type { RequestInput } from "@/shared/application/general-controller.js";
import type { HttpResponse } from "@/shared/application/http-responses.js";
import type {
	UserEntity,
	UserEntityOutput,
} from "../../infra/domain/User.entity.js";

type UserId = Pick<UserEntity, "id">;

export namespace DTOUserReadController {
	export interface Input extends RequestInput {
		id: UserId["id"];
	}

	interface ControllerResponse extends UserEntityOutput {}

	export interface Output extends HttpResponse<ControllerResponse> {}
}

export namespace DTOUserReadUseCase {
	export interface Input {
		id: UserId["id"];
	}

	export interface Output extends UserEntityOutput {}
}
