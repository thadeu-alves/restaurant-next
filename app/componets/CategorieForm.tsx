"use client";

import { useState } from "react";
import { FormLabel } from "./ui/FormLabel";
import { FormSubmit } from "./ui/FormSubmit";
import { connection } from "@/lib/connection";

export function CategorieForm() {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await connection.post(
                "/categorias",
                JSON.stringify({
                    ...formData,
                })
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create categorie item"
                );
            }

            setFormData({
                name: "",
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
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <FormLabel
                    label="Categorie Name"
                    titulo="name"
                    value={formData.name}
                    handleChange={handleChange}
                    required
                />

                <FormSubmit
                    isLoading={isLoading}
                    text="Add Categorie Item"
                />
            </form>
        </div>
    );
}
