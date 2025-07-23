import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, price, categoryId, urlImg, all } =
            await req.json();

        if (all) {
            const data = await prisma.food.findMany();

            return NextResponse.json(
                { data },
                { status: 201 }
            );
        }

        if (!title || !price || !categoryId) {
            return NextResponse.json(
                { error: "Missing props!" },
                { status: 400 }
            );
        }

        const food = await prisma.food.create({
            data: {
                title,
                price,
                categoryId,
                urlImg,
            },
        });

        return NextResponse.json(food, { status: 201 });
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
        const data = await prisma.category.findMany({
            include: {
                foods: true,
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
        const { title, price, categoryId, urlImg, id } =
            await req.json();

        if (!title || !price || !categoryId || !id) {
            return NextResponse.json(
                { error: "Missing props!" },
                { status: 400 }
            );
        }

        const food = await prisma.food.update({
            where: {
                id,
            },
            data: {
                title,
                price,
                categoryId,
                urlImg,
            },
        });

        return NextResponse.json(food, { status: 200 });
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
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Missing id prop!" },
                { status: 400 }
            );
        }

        const food = await prisma.food.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(food, { status: 200 });
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
