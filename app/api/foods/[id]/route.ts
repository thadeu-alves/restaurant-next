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
            throw new Error("Food don't exists.");
        }

        return NextResponse.json({
            data,
        });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json(
                {
                    error: err.message,
                },
                { status: 400 }
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
