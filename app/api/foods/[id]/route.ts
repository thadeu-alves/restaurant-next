import { ApiError, NotFoundError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        const { id } = await params;

        const data = await prisma.food.findFirst({
            where: { id },
        });

        if (!data) {
            throw new NotFoundError("Food not finded.");
        }

        return NextResponse.json({
            data,
        });
    } catch (err) {
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
                error: "Falha ao retornar comida: " + err,
            },
            { status: 500 }
        );
    }
}
