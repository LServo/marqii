const moduleErrorMessages = {
    BAD_REQUEST: {
        AUTH_RESET_NEW_PASSWORD: "New Password Required!",
        ACCESS_TOKEN_BAD_FORMAT: "Access Token has bad format",
        REFRESH_TOKEN_BAD_FORMAT: "Refresh Token has bad format",
    },
    UNAUTHORIZED: {
        AUTH_UNAUTHORIZED: "Unauthorized",
        AUTH_USER_OR_PASSWORD_INVALID: "User or Password Invalid!",
        ACCESS_TOKEN_REVOKED: "Access Token has been expired or revoked",
        REFRESH_TOKEN_INVALID: "Refresh Token has been revoked",
    },
    FORBIDDEN: {
        AUTH_USER_BLOCKED: "User is blocked! Please recover account!",
    },
    NOT_FOUND: {
        ACCOUNT_NOT_FOUND: "Account not found",
        USER_NOT_FOUND: "User not found!",
        PROFILE_NOT_FOUND: "Profile not found",
    },
    CONFLICT: {},
    UNPROCESSABLE_ENTITY: {
        AUTH_USER_DISABLED: "User is disabled! Please contact administrator",
    },
    OTHERS: {
        INTERNAL_SERVER_ERROR: "Internal Server Error",
    },
};
export const accountsErrorMessages = {
    ...moduleErrorMessages.BAD_REQUEST,
    ...moduleErrorMessages.UNAUTHORIZED,
    ...moduleErrorMessages.FORBIDDEN,
    ...moduleErrorMessages.NOT_FOUND,
    ...moduleErrorMessages.CONFLICT,
    ...moduleErrorMessages.UNPROCESSABLE_ENTITY,
    ...moduleErrorMessages.OTHERS,
};
//# sourceMappingURL=error-msgs.js.map