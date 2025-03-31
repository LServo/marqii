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
import { notFound } from "../../../../shared/application/index.js";
import { SaveLogs } from "../../../../shared/application/save-logs.js";
import { inject, injectable } from "tsyringe";
let UserCreateUseCase = class UserCreateUseCase {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ name, email, birthDate, globalAdmin, }) {
        SaveLogs.UseCaseTitle("UserCreateUseCase (execute)");
        const userAlreadyExists = await this.usersRepository.getUserByEmail({
            email,
        });
        if (!userAlreadyExists)
            throw notFound({ error_code: "USER_NOT_FOUND" });
        const createdUser = await this.usersRepository.createUser({
            name,
            email,
            birthDate,
            globalAdmin,
            idProvider: "test",
        });
        const output = { ...createdUser };
        return output;
    }
};
UserCreateUseCase = __decorate([
    injectable(),
    __param(0, inject("UsersRepository")),
    __metadata("design:paramtypes", [Object])
], UserCreateUseCase);
export { UserCreateUseCase };
//# sourceMappingURL=user-create-use-case.js.map