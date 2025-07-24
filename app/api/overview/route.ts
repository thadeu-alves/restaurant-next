import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const income = await transaction.income();
        const expense = await transaction.expense();
        const balance = await transaction.saldo();
        const foodsAmount = await prisma.food.count();
        const foodsAttach = await prisma.food.aggregate({
            _sum: {
                price: true,
            },
        });

        return NextResponse.json({
            income,
            expense,
            balance,
            foodsAmount,
            foodsAttach: foodsAttach._sum.price,
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

        return data._sum.amount;
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

        return data._sum.amount;
    },
    async saldo() {
        const income = await this.income();
        const expense = await this.expense();

        return (income || 0) - (expense || 0);
    },
};
