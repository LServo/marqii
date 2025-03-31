import { Controller } from "../../../../shared/application/general-controller.js";
import { ok } from "../../../../shared/application/http-responses.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { zodValidation } from "../../../../utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserReadUseCase } from "./user-read-use-case.js";
class UserReadController extends Controller {
    async handle(input) {
        SaveLogs.ControllerTitle("UserReadController (handle)");
        await this.validateInput(input);
        const userReadUseCase = container.resolve(UserReadUseCase);
        const response = await userReadUseCase.execute(input);
        return ok(response);
    }
    async validateInput(input) {
        SaveLogs.ControllerTitle("UserCreateController (validateInput)");
        const schema = z.object({
            id: z.string().uuid(),
        });
        await zodValidation(input, schema);
    }
}
export { UserReadController };
//# sourceMappingURL=user-read-controller.js.map