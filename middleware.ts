import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    if (request.method === "GET") {
        response.headers.set(
            "Access-Control-Allow-Origin",
            "*"
        );
    }

    // if (request.method === "POST") {
    //     const allowedOrigin = "http://localhost:3000";
    //     const origin = request.headers.get("origin");

    //     if (origin === allowedOrigin) {
    //         response.headers.set(
    //             "Access-Control-Allow-Origin",
    //             origin
    //         );
    //     } else {
    //         return new NextResponse(
    //             "Acesso não permitido",
    //             { status: 403 }
    //         );
    //     }
    // }

    response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );
    response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    return response;
}

export const config = {
    matcher: "/api/:path*",
};
