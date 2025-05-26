import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { titulo } = await req.json();

        if (!titulo) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const categoria = await prisma.categoria.create({
            data: {
                nome: titulo,
            },
        });

        return NextResponse.json(categoria, {
            status: 201,
        });
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
        const data = await prisma.categoria.findMany({});

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
