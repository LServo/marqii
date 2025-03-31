import { Controller } from "@/shared/application/general-controller.js";
import { noContent, ok } from "@/shared/application/http-responses.js";
import { SaveLogs } from "@/shared/application/save-logs.js";
import { zodValidation } from "@/utils/zod-validation.js";
import { container } from "tsyringe";
import { z } from "zod";
import { UserReadUseCase } from "./user-read-use-case.js";
import type { DTOUserReadController } from "./user-read.types.js";

class UserReadController extends Controller {
	override async handle(
		input: DTOUserReadController.Input,
	): Promise<DTOUserReadController.Output> {
		SaveLogs.ControllerTitle("UserReadController (handle)");

		await this.validateInput(input);

		const userReadUseCase = container.resolve(UserReadUseCase);

		const response = await userReadUseCase.execute(input);

		return ok(response);
	}

	private async validateInput(
		input: Omit<DTOUserReadController.Input, "userContext">,
	) {
		SaveLogs.ControllerTitle("UserCreateController (validateInput)");

		const schema = z.object({
			id: z.string().uuid(),
		});

		await zodValidation(input, schema);
	}
}

export { UserReadController };
