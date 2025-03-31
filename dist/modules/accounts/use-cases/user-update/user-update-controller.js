import { Controller } from "../../../../shared/application/general-controller.js";
import { noContent } from "../../../../shared/application/http-responses.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { zodValidation } from "../../../../utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserUpdateUseCase } from "./user-update-use-case.js";
class UserUpdateController extends Controller {
    async handle(input) {
        SaveLogs.ControllerTitle("UserUpdateController (handle)");
        console.log("input:", input);
        await this.validateInput(input);
        const userUpdateUseCase = container.resolve(UserUpdateUseCase);
        await userUpdateUseCase.execute({
            id: input.id,
            data: {
                name: input.name,
                email: input.email,
                birthDate: input.birthDate,
            },
        });
        return noContent();
    }
    async validateInput(input) {
        SaveLogs.ControllerTitle("UserCreateController (validateInput)");
        const schema = z.object({
            id: z.string().uuid(),
            name: z
                .string()
                .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
            email: z.string().email({ message: "Email inválido" }),
            birthDate: z.string().datetime(),
        });
        await zodValidation(input, schema);
    }
}
export { UserUpdateController };
//# sourceMappingURL=user-update-controller.js.map