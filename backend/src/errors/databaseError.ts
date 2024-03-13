class DatabaseError extends Error {
  code: string;

  constructor(message: string, code: string) {
      super(message);
      this.code = code;
  }
}

class SchemaNotFound extends DatabaseError {
  constructor(message: string) {
      super(message, 'ER_NO_SUCH_SCHEMA');
  }
}

class DocumentNotFound extends DatabaseError {
  constructor(message: string) {
      super(message, 'ER_NO_SUCH_DOCUMENT');
  }
}

class UnhandledError extends DatabaseError {
  constructor(message: string) {
      super(message, 'UNHANDLED_ERROR');
  }
}

export { DatabaseError, SchemaNotFound, DocumentNotFound, UnhandledError };