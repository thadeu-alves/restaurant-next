export abstract class ApiError extends Error {
    constructor(private msg: string, private stt: number) {
        super(msg);
        this.msg = msg;
        this.stt = stt;
    }

    getMsg() {
        return this.msg;
    }

    getStt() {
        return this.stt;
    }
}

export class BadRequestError extends ApiError {
    constructor(msg: string) {
        super(msg, 400);
    }
}

export class NotFoundError extends ApiError {
    constructor(msg: string) {
        super(msg, 404);
    }
}
