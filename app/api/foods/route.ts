import { errorHandler } from "@/lib/errorHandler";
import {
    BadRequestError,
    NotFoundError,
} from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.food.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });

        if (!data) {
            throw new NotFoundError("No foods finded.");
        }

        return NextResponse.json({
            data,
        });
    } catch (err) {
        errorHandler(err);
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
            throw new BadRequestError("Missing props.");
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
        errorHandler(err);
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
            throw new BadRequestError("Missing props.");
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
        errorHandler(err);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            throw new BadRequestError("Missing id prop.");
        }

        const food = await prisma.food.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(food, { status: 200 });
    } catch (err) {
        errorHandler(err);
    }
}
