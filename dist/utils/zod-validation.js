import { InputValidationError } from "../shared/application/index.js";
export async function zodValidation(input, schema) {
    const isValid = await schema.safeParseAsync(input);
    if (!isValid.success)
        throw new InputValidationError({
            message: "",
            detailed: isValid.error.flatten()?.fieldErrors,
        });
}
//# sourceMappingURL=zod-validation.js.map