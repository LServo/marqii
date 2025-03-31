import { logger } from "@/shared/application/logger.js";
import { PrismaClient } from "@prisma/client";
import type { PrismaClientOptions } from "@prisma/client/runtime/library";

const shouldDebug = process.env.PRISMA_DEBUG === "true";

const options = {
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
	},
	log: [
		{
			emit: "event",
			level: "query",
		},
	],
} satisfies PrismaClientOptions;

if (!shouldDebug) Reflect.deleteProperty(options, "log");

export const prisma = new PrismaClient(options);

if (shouldDebug)
	prisma.$on("query", async (e) => {
		logger.info(`${e.query} ${e.params}`);
	});
