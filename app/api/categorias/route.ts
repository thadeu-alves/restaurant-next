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

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao pegar categoria: " + err,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const { categoriaId, titulo } = await req.json();

        if (!categoriaId && !titulo) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const categoria = await prisma.categoria.update({
            where: {
                id: categoriaId,
            },
            data: {
                nome: titulo,
            },
        });

        return NextResponse.json(categoria, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    "Falha ao tentar atualizar categoria: " +
                    err,
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { categoriaId } = await req.json();

        if (!categoriaId) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const categoria = await prisma.categoria.findMany({
            where: {
                id: categoriaId,
            },
            include: {
                comidas: true,
            },
        });

        console.log(categoria[0].comidas);

        if (categoria[0].comidas.length > 0) {
            return NextResponse.json(
                {
                    error: "Só é possivel deletar uma categoria vazia!",
                },
                { status: 400 }
            );
        }

        await prisma.categoria.deleteMany({
            where: {
                id: categoriaId,
            },
        });

        return NextResponse.json(categoria, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    "Falha ao tentar deletar categoria: " +
                    err,
            },
            {
                status: 500,
            }
        );
    }
}
