"use client";

import React, { useState } from "react";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";

interface FormProps {
    amount: string;
    type: "INCOME" | "EXPENSE" | "";
    description?: string;
}

export function TransactionForm() {
    const [formData, setFormData] = useState<FormProps>({
        amount: "",
        type: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await connection.post(
                "/transacoes",
                JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                })
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create transaction item"
                );
            }

            setFormData({
                amount: "",
                type: "",
                description: "",
            });
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

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Form.Label
                    label="Transaction Amount"
                    titulo="amount"
                    value={formData?.amount || ""}
                    handleChange={handleChange}
                />

                <div>
                    <label
                        htmlFor="type"
                        className="block text-sm font-medium text-[var(--primary)]"
                    >
                        Transaction Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData?.type}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    >
                        <option value="">
                            Select a Type
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
                    titulo="description"
                    value={formData?.description || ""}
                    handleChange={handleChange}
                />

                <Form.Submit
                    isLoading={isLoading}
                    text="Add Transaction Item"
                />
            </form>
        </Form.Container>
    );
}
