abstract class ApiError extends Error {
    constructor(private msg: string, private stt: number) {
        super(msg);
        Object.setPrototypeOf(this, ApiError.prototype);
        Error.captureStackTrace(this, ApiError);
    }
}

export class BadRequestError extends ApiError {
    constructor(msg: string) {
        super(msg, 400);
    }
}

export class NotFoundError extends ApiError {
    constructor(msg: string) {
        super(msg, 400);
    }
}
