import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const category = await prisma.category.create({
            data: {
                name,
            },
        });

        return NextResponse.json(category, {
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
        const data = await prisma.category.findMany({});

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
        const { id, name } = await req.json();

        if (!id && !name) {
            return NextResponse.json(
                { error: "Missing Props!" },
                { status: 400 }
            );
        }

        const category = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(category, {
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
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Missing props!" },
                { status: 400 }
            );
        }

        const category = await prisma.category.findMany({
            where: {
                id,
            },
            include: {
                foods: true,
            },
        });

        console.log(category[0].foods);

        if (category[0].foods.length > 0) {
            return NextResponse.json(
                {
                    error: "It is only possible to delete a category empty!",
                },
                { status: 400 }
            );
        }

        await prisma.category.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(category, {
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
