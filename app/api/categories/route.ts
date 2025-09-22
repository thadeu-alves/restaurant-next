import { errorHandler } from "@/lib/errorHandler";
import { BadRequestError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.category.findMany();

        return NextResponse.json({
            data,
        });
    } catch (err) {
        errorHandler(err);
    }
}

export async function POST(req: Request) {
    try {
        const { name, urlImg } = await req.json();

        if (!name || !urlImg) {
            throw new BadRequestError("Missing props.");
        }

        const data = await prisma.category.create({
            data: {
                name,
            },
        });

        return NextResponse.json(
            { data },
            {
                status: 201,
            }
        );
    } catch (err) {
        errorHandler(err);
    }
}

export async function PUT(req: Request) {
    try {
        const { id, name, urlImg } = await req.json();

        if (!id || !name || !urlImg) {
            throw new BadRequestError("Missing props.");
        }

        const data = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(
            { data },
            {
                status: 200,
            }
        );
    } catch (err) {
        errorHandler(err);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            throw new BadRequestError("Missing props.");
        }

        const data = await prisma.category.findMany({
            where: {
                id,
            },
            include: {
                foods: true,
            },
        });

        if (data[0].foods.length > 0) {
            throw new BadRequestError(
                "You can delete only an empty category."
            );
        }

        await prisma.category.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(
            { success: true },
            {
                status: 200,
            }
        );
    } catch (err) {
        errorHandler(err);
    }
}
