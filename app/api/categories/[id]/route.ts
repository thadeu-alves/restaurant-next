import { errorHandler } from "@/lib/errorHandler";
import { BadRequestError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        const { id } = await params;

        if (isNaN(Number(id))) {
            throw new BadRequestError(
                "Id must be an Integer"
            );
        }

        const data = await prisma.category.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                foods: {
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
            },
        });

        return NextResponse.json({ data });
    } catch (err) {
        errorHandler(err);
    }
}
