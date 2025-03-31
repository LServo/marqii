import { Router } from "express";
import { v1UsersRoutes } from "./accounts/users.routes.js";
const developmentRoutes = Router();
var RouteTags;
(function (RouteTags) {
    RouteTags["users"] = "/users";
})(RouteTags || (RouteTags = {}));
developmentRoutes.use(RouteTags.users, v1UsersRoutes);
export { developmentRoutes, RouteTags };
//# sourceMappingURL=index.js.map