import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                {
                    error: "id is missing",
                },
                {
                    status: 400,
                }
            );
        }

        const data = await prisma.comida.findMany({
            where: {
                id,
            },
        });

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao retornar comida: " + err,
            },
            { status: 500 }
        );
    }
}
