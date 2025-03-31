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

// try {
// 	await prisma.items.createMany({
// 		data: [
// 			{
// 				id: "68aa9749-bbe9-4b2d-be4f-c0b8f9315c13",
// 				name: "Americano",
// 				price: 5,
// 				image:
// 					"https://square-production.s3.amazonaws.com/files/b6b0b4be884a41952a03c52fc149b6c06d517074/original.jpeg",
// 				description: "The Best Coffee!",
// 				section_id: "703945f6-b96d-477b-ac71-8280c2c7990b",
// 			},
// 			{
// 				id: "33ef413d-ba01-4637-966c-aa05292b1845",
// 				name: "Espresso",
// 				price: 4,
// 				image:
// 					"https://square-production.s3.amazonaws.com/files/b6b0b4be884a41952a03c52fc149b6c06d517074/original.jpeg",
// 				description: "Italian blend",
// 				section_id: "703945f6-b96d-477b-ac71-8280c2c7990b",
// 			},
// 			{
// 				id: "7f78223e-bee9-4f3d-a72d-1a3d3833ccdc",
// 				name: "Cesar Salad",
// 				price: 12,
// 				image: null,
// 				description: null,
// 				section_id: "5d7ec491-137a-4acf-9588-8bb8b75bbeb7",
// 			},
// 			{
// 				id: "2f324292-3507-4476-8f09-26db463d64ec",
// 				name: "Wedge Salad",
// 				price: 12.5,
// 				image: null,
// 				description: null,
// 				section_id: "089d8180-a04d-4a6c-94f6-94aed746ed8e",
// 			},
// 			{
// 				id: "407aa158-9f63-4cdb-bc5d-4958140c4fbf",
// 				name: "100% Rye Bread",
// 				price: 7.75,
// 				image: null,
// 				description: null,
// 				section_id: "29301c47-c44f-4b1c-9003-819ccec1e0be",
// 			},
// 			{
// 				id: "989729f9-72c0-4a6d-9cbe-0dbed6476a0e",
// 				name: "Bourbon Honey Cake",
// 				price: 14.950000000000001,
// 				image:
// 					"https://square-production.s3.amazonaws.com/files/b6b0b4be884a41952a03c52fc149b6c06d517074/original.jpeg",
// 				description: "WOW THIS TASTES GREAT!!!!",
// 				section_id: "8e4bbb66-f316-49f0-9309-59c75b65e6dc",
// 			},
// 			{
// 				id: "d76168aa-4490-4cf1-8f25-7c406a1a9e4f",
// 				name: "Garlic Hummus",
// 				price: 6.5,
// 				image: null,
// 				description: null,
// 				section_id: "1f5e97b7-a284-4477-9897-a1311d1c0ca6",
// 			},
// 			{
// 				id: "f75810bc-b875-4c44-83e6-bb560123537b",
// 				name: "Babaganoush",
// 				price: 7.25,
// 				image: null,
// 				description: null,
// 				section_id: "1f5e97b7-a284-4477-9897-a1311d1c0ca6",
// 			},
// 			{
// 				id: "ecf54561-c843-4ad9-bc41-e7b0e45d2847",
// 				name: "Assorted Dinner Rolls",
// 				price: 0,
// 				image:
// 					"https://square-production.s3.amazonaws.com/files/b6b0b4be884a41952a03c52fc149b6c06d517074/original.jpeg",
// 				description: "Your choice of bread",
// 				section_id: "1f5e97b7-a284-4477-9897-a1311d1c0ca6",
// 			},
// 			{
// 				id: "c53dbdde-8108-45e5-aeef-e05b1fd9569c",
// 				name: "Brussel Sprouts and Beets",
// 				price: 10.5,
// 				image: null,
// 				description: "Healthy for you",
// 				section_id: "1f5e97b7-a284-4477-9897-a1311d1c0ca6",
// 			},
// 		],
// 	});
// } catch (error) {
// 	console.log("error:", error);
// }
