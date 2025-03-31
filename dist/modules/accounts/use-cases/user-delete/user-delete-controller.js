import { Controller } from "../../../../shared/application/general-controller.js";
import { ok } from "../../../../shared/application/http-responses.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { zodValidation } from "../../../../utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserDeleteUseCase } from "./user-delete-use-case.js";
class UserDeleteController extends Controller {
    async handle(input) {
        SaveLogs.ControllerTitle("UserDeleteController (handle)");
        await this.validateInput(input);
        const userDeleteUseCase = container.resolve(UserDeleteUseCase);
        const response = await userDeleteUseCase.execute(input);
        return ok(response);
    }
    async validateInput(input) {
        SaveLogs.ControllerTitle("UserDeleteController (validateInput)");
        const schema = z.object({
            id: z.string().uuid(),
        });
        await zodValidation(input, schema);
    }
}
export { UserDeleteController };
//# sourceMappingURL=user-delete-controller.js.map