"use client";

export interface FormProps {
    title: string;
    price: number;
    categoryId: string;
    urlImg: string;
    isUpdate: boolean;
    id?: number;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";

export function FoodForm({
    title,
    price,
    categoryId,
    urlImg,
    isUpdate,
    id,
}: FormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title,
        price,
        categoryId,
        urlImg,
    });

    const [categories, setCategories] = useState<
        Array<{
            id: number;
            name: string;
        }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            async function fetchCategories() {
                const response = await connection.get(
                    "/categorias"
                );
                const { data } = await response.json();
                setCategories(data);
            }
            fetchCategories();
        } catch (err) {
            setError("Failed to load categories" + err);
        }
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = isUpdate
                ? await connection.put(
                      "/foods",
                      JSON.stringify({
                          ...formData,
                          categoryId: Number(
                              formData.categoryId
                          ),
                          price: Number(formData.price),
                          id: Number(id),
                      })
                  )
                : await connection.post(
                      "/foods",
                      JSON.stringify({
                          ...formData,
                          categoryId: Number(
                              formData.categoryId
                          ),
                          price: Number(formData.price),
                      })
                  );

            console.log(
                JSON.stringify({
                    ...formData,
                    categoryId: Number(formData.categoryId),
                    price: Number(formData.price),
                })
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create food item"
                );
            }

            setFormData({
                title: "",
                price: 0,
                categoryId: "",
                urlImg: "",
            });

            if (isUpdate) router.back();
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
                    title="title"
                    value={formData.title}
                    handleChange={handleChange}
                />

                <Form.Label
                    label="Price"
                    title="price"
                    type="number"
                    value={formData.price.toString()}
                    handleChange={handleChange}
                    required
                />

                <div>
                    <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-[var(--primary)]"
                    >
                        Category
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
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
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Form.Label
                    label="Image URL (optional)"
                    title="urlImg"
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
