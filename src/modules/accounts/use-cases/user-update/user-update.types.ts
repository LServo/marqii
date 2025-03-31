import type { RequestInput } from "@/shared/application/general-controller.js";
import type { HttpResponse } from "@/shared/application/http-responses.js";
import type {
	UserEntity,
	UserEntityInput,
} from "../../infra/domain/User.entity.js";

type UserId = Pick<UserEntity, "id">;

export namespace DTOUserUpdateController {
	export interface Input
		extends RequestInput,
			Omit<UserEntityInput, "idProvider"> {
		id: UserId["id"];
	}

	export interface Output extends HttpResponse {}
}

export namespace DTOUserUpdateUseCase {
	export interface Input {
		id: UserId["id"];
		data: Omit<UserEntityInput, "idProvider">;
	}

	export type Output = undefined;
}
