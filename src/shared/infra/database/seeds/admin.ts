import type { UserEntityInput } from "@/modules/accounts/infra/domain/User.entity.js";
import { logger } from "@/shared/application/logger.js";
import type { UUID } from "@/shared/main/@types/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	logger.info("Iniciando seed de módulos...");

	const userData = {
		name: "Admin",
		email: "admin@admin.com",
		birthDate: new Date(),
		globalAdmin: true,
		idProvider: "admin" as UUID,
	} satisfies UserEntityInput;

	await prisma.users.create({
		data: userData,
	});

	logger.info("Seed de Admin finalizada com sucesso!");
}

main()
	.catch((e) => {
		logger.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
