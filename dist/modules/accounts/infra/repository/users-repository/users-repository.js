import { SaveLogs } from "../../../../../shared/application/save-logs.js";
import { prisma } from "../../../../../shared/infra/database/prisma-client.js";
class PrismaUsersRepository {
    async createUser({ name, email, birthDate, idProvider, }) {
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
            id: createdUser.id,
        };
        return output;
    }
    async readUser({ id }) {
        SaveLogs.RepositoryTitle("PrismaUsersRepository (readUser)");
        const userFound = await prisma.users.findFirst({
            where: { id },
        });
        if (!userFound)
            return undefined;
        const output = {
            ...userFound,
            id: userFound.id,
        };
        return output;
    }
    async updateUser({ id, data }) {
        SaveLogs.RepositoryTitle("PrismaUsersRepository (updateUser)");
        await prisma.users.update({
            where: { id: id },
            data,
        });
    }
    async deleteUser({ id }) {
        SaveLogs.RepositoryTitle("PrismaUsersRepository (deleteUser)");
        await prisma.users.update({
            where: { id },
            data: {
                active: false,
            },
        });
    }
    async getUserByEmail({ email, }) {
        SaveLogs.RepositoryTitle("PrismaUsersRepository (getUserByEmail)");
        const userFound = await prisma.users.findFirst({
            where: {
                email,
            },
            select: { id: true },
        });
        if (!userFound)
            return undefined;
        const output = {
            id: userFound.id,
        };
        return output;
    }
}
export { PrismaUsersRepository };
//# sourceMappingURL=users-repository.js.map