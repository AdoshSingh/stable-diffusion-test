class ApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
      super(message);
      this.code = code;
  }
}

class Unauthorized extends ApiError {
  constructor(message: string) {
      super(message, 'UNAUTHORIZED');
  }
}

class PermissionDenied extends ApiError {
  constructor(message: string) {
      super(message, 'PERMISSION_DENIED');
  }
}

class EngineNotFound extends ApiError {
  constructor(message: string) {
      super(message, 'ENGINE_NOT_FOUND');
  }
}

class UnhandledError extends ApiError {
  constructor(message: string) {
      super(message, 'UNHANDLED_ERROR');
  }
}

export { Unauthorized, PermissionDenied, EngineNotFound, UnhandledError};