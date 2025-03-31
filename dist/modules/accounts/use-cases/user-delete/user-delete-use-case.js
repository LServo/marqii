var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { notFound } from "../../../../shared/application/http-responses.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
let UserDeleteUseCase = class UserDeleteUseCase {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ id, }) {
        SaveLogs.UseCaseTitle("UserDeleteUseCase (execute)");
        const userExists = await this.usersRepository.readUser({
            id,
        });
        if (!userExists)
            throw notFound({ error_code: "USER_NOT_FOUND" });
        await this.usersRepository.deleteUser({ id });
    }
};
UserDeleteUseCase = __decorate([
    injectable(),
    __param(0, inject("UsersRepository")),
    __metadata("design:paramtypes", [Object])
], UserDeleteUseCase);
export { UserDeleteUseCase };
//# sourceMappingURL=user-delete-use-case.js.map