import { errorHandler } from "@/lib/errorHandler";
import { NotFoundError } from "@/lib/errors";
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

        const data = await prisma.food.findFirst({
            where: { id },
        });

        if (!data) {
            throw new NotFoundError("Food not finded.");
        }

        return NextResponse.json({
            data,
        });
    } catch (err) {
        errorHandler(err);
    }
}
