import type { UUID } from "@/shared/main/@types/index.js";
import type {
	UserEntity,
	UserEntityInput,
	UserEntityOutput,
} from "../../domain/User.entity.js";

type UserId = Pick<UserEntity, "id">;

export namespace CreateUser {
	export interface Input extends UserEntityInput {}
	export interface Output extends UserEntityOutput {}
}

export namespace ReadUser {
	export interface Input extends UserId {}
	export interface Output extends UserEntityOutput {
		id: UUID;
	}
}

export namespace UpdateUser {
	export interface Input {
		id: UserId["id"];
		data: Omit<UserEntityInput, "id" | "idProvider">;
	}
	export type Output = undefined;
}

export namespace DeleteUser {
	export interface Input extends UserId {}
	export type Output = undefined;
}

export namespace GetUserByEmail {
	type UserEmail = Pick<UserEntity, "email">;
	export interface Input extends UserEmail {}

	export interface Output extends UserId {}
}
