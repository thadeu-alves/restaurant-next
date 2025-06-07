"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormLabel } from "./ui/FormLabel";
import { FormSubmit } from "./ui/FormSubmit";

export function FoodForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        titulo: "",
        preco: "",
        categoriaId: "",
        urlImg: "",
    });

    const [categories, setCategories] = useState<
        Array<{
            id: number;
            nome: string;
        }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/categorias",
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError("Failed to load categories" + err);
            }
        };
        fetchCategories();
    }, []);

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
                "http://localhost:3000/api/comidas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        categoriaId: Number(
                            formData.categoriaId
                        ),
                        preco: formData.preco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to create food item"
                );
            }

            setFormData({
                titulo: "",
                preco: "",
                categoriaId: "",
                urlImg: "",
            });

            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                Add New Food Item
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
                    label="Food Name"
                    titulo="titulo"
                    value={formData.titulo}
                    handleChange={handleChange}
                />

                <FormLabel
                    label="Price"
                    titulo="preco"
                    value={formData.preco}
                    handleChange={handleChange}
                />

                <div>
                    <label
                        htmlFor="categoriaId"
                        className="block text-sm font-medium text-[var(--primary)]"
                    >
                        Category
                    </label>
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    >
                        <option value="">
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <FormLabel
                    label="Image URL (optional)"
                    titulo="urlImg"
                    type="url"
                    value={formData.urlImg}
                    handleChange={handleChange}
                />

                <FormSubmit
                    isLoading={isLoading}
                    text="Add Food Item"
                />
            </form>
        </div>
    );
}
