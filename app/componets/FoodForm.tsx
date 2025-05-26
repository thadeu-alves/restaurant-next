"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
            const response = await fetch("/api/comidas", {
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
            });

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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
                <div>
                    <label
                        htmlFor="titulo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Food Name
                    </label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                </div>

                <div>
                    <label
                        htmlFor="preco"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        id="preco"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 29.90"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                </div>

                <div>
                    <label
                        htmlFor="categoriaId"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Category
                    </label>
                    <select
                        id="categoriaId"
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
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

                <div>
                    <label
                        htmlFor="urlImg"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Image URL (optional)
                    </label>
                    <input
                        type="url"
                        id="urlImg"
                        name="urlImg"
                        value={formData.urlImg}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isLoading
                        ? "Adding..."
                        : "Add Food Item"}
                </button>
            </form>
        </div>
    );
}
