import type { RequestInput } from "@/shared/application/general-controller.js";
import type { HttpResponse } from "@/shared/application/http-responses.js";
import type { UserEntity } from "../../infra/domain/User.entity.js";

type UserId = Pick<UserEntity, "id">;

export namespace DTOUserDeleteController {
	export interface Input extends RequestInput {
		id: UserId["id"];
	}

	export interface Output extends HttpResponse {}
}

export namespace DTOUserDeleteUseCase {
	export interface Input {
		id: UserId["id"];
	}

	export type Output = undefined;
}
