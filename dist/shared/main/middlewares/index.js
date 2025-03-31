export * from "./express-router.js";
const middlewareErrorMessages = {
    ACCESS_DENIED: "You do not have permission to access this resource",
    INVALID_TOKEN: "Invalid token provided",
    TOKEN_NOT_FOUND: "No token provided",
    USER_NOT_FOUND_ON_LEVELS: "User not found on levels",
    USER_LEVEL_NOT_ALLOWED: "User level not allowed",
    UPLOAD_FILE_FAILED: "Upload file failed",
    UPLOAD_FILE_NOT_FOUND: "File not found",
    UPLOAD_FILE_INVALID_TYPE: "Invalid file type",
    UPLOAD_FILE_INVALID_SIZE: "Invalid file size",
    UPLOAD_FILE_INVALID_FORMAT: "Invalid file format",
    UPLOAD_FILE_INVALID_NAME: "Invalid file name",
};
export { middlewareErrorMessages };
//# sourceMappingURL=index.js.map