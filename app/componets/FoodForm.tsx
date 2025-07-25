"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";
import { useForm } from "react-hook-form";

export interface FormProps {
    title: string;
    price: number;
    categoryId: string;
    urlImg: string;
    isUpdate: boolean;
    id?: number;
}

interface FoodFormData {
    title: string;
    price: number;
    categoryId: string;
    urlImg: string;
}

export function FoodForm({
    title,
    price,
    categoryId,
    urlImg,
    isUpdate,
    id,
}: FormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<
        Array<{
            id: number;
            name: string;
        }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FoodFormData>({
        defaultValues: {
            title,
            categoryId,
            price,
            urlImg,
        },
    });

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

    async function onSubmit(data: FoodFormData) {
        setIsLoading(true);
        setError("");

        try {
            const res = isUpdate
                ? await connection.put(
                      "/foods",
                      JSON.stringify({
                          ...data,
                          categoryId: Number(
                              data.categoryId
                          ),
                          price: Number(data.price),
                          id: Number(id),
                      })
                  )
                : await connection.post(
                      "/foods",
                      JSON.stringify({
                          ...data,
                          categoryId: Number(
                              data.categoryId
                          ),
                          price: Number(data.price),
                      })
                  );

            if (!res.ok) {
                throw new Error(
                    "Failed to create food item"
                );
            }

            reset();

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

    return (
        <Form.Container>
            <Form.Title>Add New Food Item</Form.Title>

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
                    label="Food Name"
                    title="title"
                    register={register}
                    required
                    error={errors.title?.message}
                />

                <Form.Label
                    label="Price"
                    title="price"
                    type="number"
                    register={register}
                    error={errors.price?.message}
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
                        {...register("categoryId", {
                            required:
                                "Category is required",
                        })}
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
                    title="urlImg"
                    register={register}
                    label="Image URL (optional)"
                    type="url"
                />

                <Form.Submit
                    isLoading={isLoading}
                    text="Add Food Item"
                />
            </form>
        </Form.Container>
    );
}
