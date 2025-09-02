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

        return NextResponse.json({
            data,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao retornar comida: " + err,
            },
            { status: 500 }
        );
    }
}
