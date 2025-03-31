class UserEntity {
    id;
    idProvider;
    name;
    email;
    birthDate;
    lastLogin;
    active;
    globalAdmin;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
}
class UserEntityInput {
    idProvider;
    name;
    email;
    birthDate;
    globalAdmin;
}
class UserEntityOutput {
    id;
    name;
    email;
    birthDate;
    lastLogin;
    active;
    globalAdmin;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
}
export { UserEntity, UserEntityInput, UserEntityOutput };
//# sourceMappingURL=User.entity.js.map