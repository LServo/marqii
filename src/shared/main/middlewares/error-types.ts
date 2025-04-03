export enum ErrorCodes {
  // 400 Bad Request
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // 401 Unauthorized
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  
  // 403 Forbidden
  FORBIDDEN = 'FORBIDDEN',
  ACCESS_DENIED = 'ACCESS_DENIED',
  
  // 404 Not Found
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  
  // 409 Conflict
  CONFLICT = 'CONFLICT',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  
  // 422 Unprocessable Entity
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  
  // 500 Internal Server Error
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export interface ErrorData {
  message: string;
  error: ErrorCodes | string;
  detailed?: any;
  stack?: string;
}

export interface ErrorResponse {
  statusCode: number;
  data: ErrorData;
} 