import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.food.findMany({
            orderBy: {
                updatedAt: "desc",
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

export async function POST(req: Request) {
    try {
        const {
            title,
            price,
            categoryId,
            urlImg,
            description,
        } = await req.json();

        if (
            !title ||
            !price ||
            !categoryId ||
            !description
        ) {
            throw new Error("Missing props.");
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
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const {
            title,
            price,
            categoryId,
            urlImg,
            id,
            description,
        } = await req.json();

        if (
            !title ||
            !price ||
            !categoryId ||
            !id ||
            !description
        ) {
            throw new Error("Missing props.");
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
                updatedAt: new Date().toISOString(),
            },
        });

        return NextResponse.json(food, { status: 200 });
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
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            throw new Error("Missing id prop.");
        }

        const food = await prisma.food.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(food, { status: 200 });
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
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}
