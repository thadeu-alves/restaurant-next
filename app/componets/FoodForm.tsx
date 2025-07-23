"use client";

export interface FormProps {
    titulo: string;
    preco: string;
    categoriaId: string;
    urlImg: string;
    isUpdate: boolean;
    id?: number;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";

export function FoodForm({
    titulo,
    preco,
    categoriaId,
    urlImg,
    isUpdate,
    id,
}: FormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        titulo,
        preco,
        categoriaId,
        urlImg,
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
        async function fetchCategories() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/categorias",
                    {
                        method: "GET",
                    }
                );
                const { data } = await response.json();
                setCategories(data);
            } catch (err) {
                setError("Failed to load categories" + err);
            }
        }
        fetchCategories();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = isUpdate
                ? await connection.put(
                      "/comidas",
                      JSON.stringify({
                          ...formData,
                          categoriaId: Number(
                              formData.categoriaId
                          ),
                          preco: formData.preco,
                          comidaId: Number(id),
                      })
                  )
                : await connection.post(
                      "/comidas",
                      JSON.stringify({
                          ...formData,
                          categoriaId: Number(
                              formData.categoriaId
                          ),
                          preco: formData.preco,
                      })
                  );

            if (!res.ok) {
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

            if (isUpdate) router.back();
            window.location.reload();
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
            <Form.Title>Add New Food Item</Form.Title>

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
                    label="Food Name"
                    titulo="titulo"
                    value={formData.titulo}
                    handleChange={handleChange}
                />

                <Form.Label
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

                <Form.Label
                    label="Image URL (optional)"
                    titulo="urlImg"
                    type="url"
                    value={formData.urlImg}
                    handleChange={handleChange}
                />

                <Form.Submit
                    isLoading={isLoading}
                    text="Add Food Item"
                />
            </form>
        </Form.Container>
    );
}
