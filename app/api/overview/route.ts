import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const saldo = await transaction.saldo();
        const quantidadeComidas =
            await prisma.comida.count();

        return NextResponse.json({
            saldo,
            foodsAmount: quantidadeComidas,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Falha ao pegar transações: " + err,
            },
            { status: 500 }
        );
    }
}

const transaction = {
    async income() {
        const data = await prisma.transaction.aggregate({
            where: {
                type: "INCOME",
            },
            _sum: {
                amount: true,
            },
        });

        console.log(data);

        return data;
    },
    async expense() {
        const data = await prisma.transaction.aggregate({
            where: {
                type: "EXPENSE",
            },
            _sum: {
                amount: true,
            },
        });

        console.log(data);

        return data;
    },
    async saldo() {
        const income = await this.income();
        const expense = await this.expense();

        return (
            (income._sum.amount || 0) -
            (expense._sum.amount || 0)
        );
    },
};
