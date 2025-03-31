import { PrismaClient } from "@prisma/client";
import { lightGreen, lightRed } from "../../../application/ansi-colors.js";
import { logger } from "../../../application/logger.js";
const prisma = new PrismaClient();
const waitForDatabaseReady = async () => {
    logger.info("Waiting for the database to be ready for connections...");
    let isConnected = false;
    while (!isConnected) {
        try {
            await prisma.$queryRaw `SELECT 1`;
            isConnected = true;
        }
        catch (error) {
            logger.error("Database is still unavailable. Retrying in 5 seconds...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
};
waitForDatabaseReady()
    .then(() => {
    logger.info(lightGreen, "✅ Database is Ready!");
    logger.info("\nStarting seed execution...");
})
    .catch((error) => {
    logger.error(lightRed, "❌ Database Health Check Failed!");
    logger.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=check-database-ready.js.map