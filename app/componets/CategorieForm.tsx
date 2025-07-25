"use client";

import { useState } from "react";
import { FormSubmit } from "./ui/FormSubmit";
import { connection } from "@/lib/connection";
import { useForm } from "react-hook-form";
import { Form } from "./ui/Form";

interface CategoryFormData {
    name: string;
}

export function CategorieForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(data: CategoryFormData) {
        setIsLoading(true);
        setError("");

        try {
            const res = await connection.post(
                "/categorias",
                JSON.stringify({
                    ...data,
                })
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create categorie item"
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
        <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                Add New Categorie Item
            </h2>

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
                    label="Categorie Name"
                    register={register}
                    title="name"
                    required
                    error={errors.name?.message}
                />

                <FormSubmit
                    isLoading={isLoading}
                    text="Add Categorie Item"
                />
            </form>
        </div>
    );
}
