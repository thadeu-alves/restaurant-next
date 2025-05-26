import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { data, desc } = await req.json();

        if (!data || !desc) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const evento = await prisma.evento.create({
            data: {
                data,
                descricao: desc,
            },
        });

        return NextResponse.json(evento, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao criar comida: " + err,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const data = await prisma.evento.findMany();

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao criar comida: " + err,
            },
            { status: 500 }
        );
    }
}
