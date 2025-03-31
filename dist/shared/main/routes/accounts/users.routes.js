import { Router } from "express";
import { UserCreateController } from "../../../../modules/accounts/use-cases/user-create/user-create-controller.js";
import { expressRouter as execute } from "../../middlewares/index.js";
const v1UsersRoutes = Router();
v1UsersRoutes.post("/create", execute(new UserCreateController()));
export { v1UsersRoutes };
//# sourceMappingURL=users.routes.js.map