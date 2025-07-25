"use client";

import React, { useState } from "react";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";
import { useForm } from "react-hook-form";

interface TransactionFormData {
    amount: string;
    type: "INCOME" | "EXPENSE" | "";
    description?: string;
}

export function TransactionForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<TransactionFormData>({
        defaultValues: {
            amount: "",
            type: "",
            description: "",
        },
    });

    async function onSubmit(data: TransactionFormData) {
        try {
            const res = await connection.post(
                "/transacoes",
                JSON.stringify({
                    ...data,
                    amount: parseFloat(data.amount),
                })
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create transaction item"
                );
            }

            reset();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred"
            );
        } finally {
            setTimeout(() => {
                window.location.reload();
                setIsLoading(false);
            }, 500);
        }
    }

    return (
        <Form.Container>
            <Form.Title>
                Add New Transaction Item
            </Form.Title>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <Form.Label
                    label="Transaction Amount"
                    title="amount"
                    register={register}
                    error={errors.amount?.message}
                    required
                />

                <div>
                    <label
                        htmlFor="type"
                        className="block text-sm font-medium text-[var(--primary)]"
                    >
                        Transaction Type{" "}
                        <span className="text-red-500">
                            *
                        </span>
                    </label>
                    <select
                        id="type"
                        {...register("type", {
                            required: "Type is required",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    >
                        <option value="">
                            Select a Type{" "}
                        </option>
                        <option key={0} value={"INCOME"}>
                            INCOME
                        </option>
                        <option key={1} value={"EXPENSE"}>
                            EXPENSE
                        </option>
                    </select>
                </div>

                <Form.Label
                    label="Transaction Description (optional)"
                    title="description"
                    register={register}
                    error={errors.description?.message}
                />

                <Form.Submit
                    isLoading={isLoading}
                    text="Add Transaction Item"
                />
            </form>
        </Form.Container>
    );
}
