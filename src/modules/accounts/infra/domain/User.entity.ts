import type { UUID } from "@/shared/main/@types/index.js";
import type { Users } from "@prisma/client";

class UserEntity implements Users {
	id: UUID;
	idProvider: UUID;

	name: string;
	email: string;
	birthDate: Date | null;
	lastLogin: Date | null;
	active: boolean;
	globalAdmin: boolean;

	createdAt: Date;
	createdBy: string | null;
	updatedAt: Date;
	updatedBy: string | null;
}

class UserEntityInput implements Partial<UserEntity> {
	idProvider: UUID;

	name: string;
	email: string;
	birthDate: Date | null;
}

class UserEntityOutput implements Partial<UserEntity> {
	id: UUID;

	name: string;
	email: string;
	birthDate: Date | null;
	lastLogin: Date | null;
	active: boolean;
	globalAdmin: boolean;

	createdAt: Date;
	createdBy: string | null;
	updatedAt: Date;
	updatedBy: string | null;
}

export { UserEntity, UserEntityInput, UserEntityOutput };
