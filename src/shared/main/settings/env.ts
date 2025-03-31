import { z } from "zod";

const envSchema = z.object({
	// APPLICATION SETTINGS
	PORT: z.string().refine((value) => /^[0-9]+$/.test(value), {
		message: "A string deve conter apenas números.",
	}),
	DATABASE_URL: z.string(),
	DATABASE_DIRECT: z.string(),
	TZ: z.string().default("America/Sao_Paulo"),

	AWS_REGION: z.string(),
	AWS_COGNITO_ID: z.string(),
	AWS_COGNITO_SECRET: z.string(),
	AWS_COGNITO_POOL_ID: z.string(),
	AWS_COGNITO_CLIENT_ID: z.string(),
});

// Parse and validate environment variables
const parsedEnv = envSchema.parse(process.env);

// Assign the parsed environment variables to ProcessEnv
Object.assign(process.env, parsedEnv);

export type EnvTypes = z.infer<typeof envSchema>;
declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvTypes {}
	}
}
