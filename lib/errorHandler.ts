import { NextResponse } from "next/server";
import { ApiError } from "./errors";

export function errorHandler(
    err: Error | ApiError | unknown
) {
    if (err instanceof ApiError) {
        return NextResponse.json(
            {
                error: err.getMsg(),
            },
            { status: err.getStt() }
        );
    }
    return NextResponse.json(
        {
            error: "Internal server Error.",
        },
        { status: 500 }
    );
}
