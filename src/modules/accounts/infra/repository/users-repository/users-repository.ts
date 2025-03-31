import { SaveLogs } from "@/shared/application/save-logs.js";
import { prisma } from "@/shared/infra/database/prisma-client.js";
import type { UUID } from "@/shared/main/@types/index.js";
import type { IUsersRepository } from "./users-repository.interface.js";
import type {
	CreateUser,
	DeleteUser,
	GetUserByEmail,
	ReadUser,
	UpdateUser,
} from "./users-repository.types.js";

class PrismaUsersRepository implements IUsersRepository {
	async createUser({
		name,
		email,
		birthDate,
		idProvider,
	}: CreateUser.Input): Promise<CreateUser.Output> {
		SaveLogs.RepositoryTitle("PrismaUsersRepository (createUser)");

		const createdUser = await prisma.users.create({
			data: {
				idProvider,
				name,
				email,
				birthDate,
			},
			omit: {
				idProvider: true,
			},
		});

		const output = {
			...createdUser,
			id: createdUser.id as UUID,
		} satisfies CreateUser.Output;

		return output;
	}

	async readUser({ id }: ReadUser.Input): Promise<ReadUser.Output> {
		SaveLogs.RepositoryTitle("PrismaUsersRepository (readUser)");

		const userFound = await prisma.users.findFirst({
			where: { id },
		});

		if (!userFound) return undefined;

		const output = {
			...userFound,
			id: userFound.id as UUID,
		} satisfies ReadUser.Output;

		return output;
	}

	async updateUser({ id, data }: UpdateUser.Input): Promise<UpdateUser.Output> {
		SaveLogs.RepositoryTitle("PrismaUsersRepository (updateUser)");

		await prisma.users.update({
			where: { id: id as string },
			data,
		});
	}

	async deleteUser({ id }: DeleteUser.Input): Promise<DeleteUser.Output> {
		SaveLogs.RepositoryTitle("PrismaUsersRepository (deleteUser)");

		await prisma.users.update({
			where: { id },
			data: {
				active: false,
			},
		});
	}

	async getUserByEmail({
		email,
	}: GetUserByEmail.Input): Promise<GetUserByEmail.Output> {
		SaveLogs.RepositoryTitle("PrismaUsersRepository (getUserByEmail)");

		const userFound = await prisma.users.findFirst({
			where: {
				email,
			},
			select: { id: true },
		});

		if (!userFound) return undefined;

		const output = {
			id: userFound.id as UUID,
		} satisfies GetUserByEmail.Output;

		return output;
	}
}

export { PrismaUsersRepository };
