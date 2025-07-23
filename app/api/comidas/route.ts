import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { titulo, preco, categoriaId, urlImg, all } =
            await req.json();

        if (all) {
            const data = await prisma.comida.findMany({
                include: {
                    categoria: true,
                },
            });

            return Response.json({ data });
        }

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

export async function PUT(req: Request) {
    try {
        const {
            titulo,
            preco,
            categoriaId,
            urlImg,
            comidaId,
        } = await req.json();

        if (
            !titulo ||
            !preco ||
            !categoriaId ||
            !comidaId
        ) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const comida = await prisma.comida.update({
            where: {
                id: comidaId,
            },
            data: {
                titulo,
                preco,
                categoriaId,
                urlImg,
            },
        });

        return NextResponse.json(comida, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    "Falha ao fazer update em comida: " +
                    err,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { comidaId } = await req.json();

        if (!comidaId) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const comida = await prisma.comida.deleteMany({
            where: {
                id: comidaId,
            },
        });

        return NextResponse.json(comida, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao deletar comida" + err,
            },
            {
                status: 500,
            }
        );
    }
}
