import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { titulo, preco, categoriaId, urlImg } =
            await req.json();

        if (!titulo || !preco || !categoriaId) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const comida = await prisma.comida.create({
            data: {
                titulo,
                preco,
                categoriaId,
                urlImg,
            },
            include: {
                categoria: true,
            },
        });

        return NextResponse.json(comida, { status: 201 });
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
        const data = await prisma.categoria.findMany({
            include: {
                comidas: true,
            },
        });

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
