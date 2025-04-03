import { prisma } from "./prisma-client.js";

declare global {
	var transactions: Record<string, unknown>;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TransactionManager {
	static async start<T>(
		operation: (transactionId: string) => Promise<T>,
	): Promise<T> {
		return await prisma.$transaction(async (tx) => {
			const transactionIdSymbol = Object.getOwnPropertySymbols(tx).find(
				(s) => s.description === "prisma.client.transaction.id",
			);

			const transactionId = tx[transactionIdSymbol] as unknown as string;

			try {
				if (!global.transactions) global.transactions = {};

				global.transactions[transactionId] = tx;

				return await operation(transactionId);
			} finally {
				delete global.transactions[transactionId];
			}
		});
	}

	static getClient(transactionId?: string) {
		return (global.transactions[transactionId] as typeof prisma) || prisma;
	}
}
