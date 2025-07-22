import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { amount, type, description } =
            await req.json();

        if (!amount || !type) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const data = await prisma.transaction.create({
            data: {
                amount,
                type,
                description,
            },
        });

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao criar transação: " + err,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const data = await prisma.transaction.findMany({});

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao pegar transações: " + err,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const { amount, type, description, id } =
            await req.json();

        if (!amount || !type || !id) {
            return NextResponse.json(
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const data = await prisma.transaction.update({
            where: {
                id,
            },
            data: {
                amount,
                type,
                description,
            },
        });

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    "Falha ao atualizar transação: " + err,
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
                { error: "Campos obrigatórios faltando!" },
                { status: 400 }
            );
        }

        const data = await prisma.transaction.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao deletar transação: " + err,
            },
            {
                status: 500,
            }
        );
    }
}
