"use client";

import { useState } from "react";
import { FormLabel } from "./ui/FormLabel";
import { FormSubmit } from "./ui/FormSubmit";

export function CategorieForm() {
    const [formData, setFormData] = useState({
        titulo: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:3000/api/categorias",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to create categorie item"
                );
            }

            setFormData({
                titulo: "",
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
    };

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
                    titulo="titulo"
                    value={formData.titulo}
                    handleChange={handleChange}
                />

                <FormSubmit
                    isLoading={isLoading}
                    text="Add Categorie Item"
                />
            </form>
        </div>
    );
}
