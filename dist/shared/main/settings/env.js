import { z } from "zod";
const envSchema = z.object({
    PORT: z.string().refine((value) => /^[0-9]+$/.test(value), {
        message: "A string deve conter apenas números.",
    }),
    DATABASE_URL: z.string(),
    DATABASE_DIRECT: z.string(),
    TZ: z.string().default("America/Sao_Paulo"),
});
const parsedEnv = envSchema.parse(process.env);
Object.assign(process.env, parsedEnv);
//# sourceMappingURL=env.js.map