import { Router } from "express";
import { UserCreateController } from "../../../../modules/accounts/use-cases/user-create/user-create-controller.js";
import { UserDeleteController } from "../../../../modules/accounts/use-cases/user-delete/user-delete-controller.js";
import { UserReadController } from "../../../../modules/accounts/use-cases/user-read/user-read-controller.js";
import { UserUpdateController } from "../../../../modules/accounts/use-cases/user-update/user-update-controller.js";
import { expressRouter as execute } from "../../middlewares/index.js";
const v1UsersRoutes = Router();
v1UsersRoutes.post("/create", execute(new UserCreateController()));
v1UsersRoutes.put("/update", execute(new UserUpdateController()));
v1UsersRoutes.get("/read", execute(new UserReadController()));
v1UsersRoutes.delete("/delete", execute(new UserDeleteController()));
export { v1UsersRoutes };
//# sourceMappingURL=users.routes.js.map