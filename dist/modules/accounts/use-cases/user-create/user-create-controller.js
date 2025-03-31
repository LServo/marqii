import { Controller, created } from "../../../../shared/application/index.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { zodValidation } from "../../../../utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserCreateUseCase } from "./user-create-use-case.js";
class UserCreateController extends Controller {
    async handle({ name, email, birthDate, globalAdmin, }) {
        SaveLogs.ControllerTitle("UserCreateController (execute)");
        const test = await this.validateInput({
            name,
            email,
            birthDate,
            globalAdmin,
        });
        console.log("test:", test);
        const userCreateUseCase = container.resolve(UserCreateUseCase);
        const result = await userCreateUseCase.execute({
            name,
            email,
            birthDate,
            globalAdmin,
        });
        return created(result);
    }
    async validateInput(input) {
        SaveLogs.ControllerTitle("UserCreateController (validateInput)");
        const schema = z.object({
            name: z
                .string()
                .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
            email: z.string().email({ message: "Email inválido" }),
            birthDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
                message: "Data de nascimento inválida",
            }),
            globalAdmin: z.boolean(),
        });
        await zodValidation(input, schema);
    }
}
export { UserCreateController };
//# sourceMappingURL=user-create-controller.js.map