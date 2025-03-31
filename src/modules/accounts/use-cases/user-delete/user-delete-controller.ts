import { Controller } from "@/shared/application/general-controller.js";
import { noContent, ok } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserDeleteUseCase } from "./user-delete-use-case.js";
import type { DTOUserDeleteController } from "./user-delete.types.js";

class UserDeleteController extends Controller {
	override async handle(
		request: DTOUserDeleteController.Input,
	): Promise<DTOUserDeleteController.Output> {
		SaveLogs.ControllerTitle("UserDeleteController (handle)");

		await this.validateInput(request);

		const userDeleteUseCase = container.resolve(UserDeleteUseCase);

		const response = await userDeleteUseCase.execute(request);

		return ok(response);
	}

	private async validateInput(
		input: Omit<DTOUserDeleteController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserDeleteController (validateInput)");

		const schema = z.object({
			id: z.string().uuid(),
		});

		await zodValidation(input, schema);
	}
}

export { UserDeleteController };
