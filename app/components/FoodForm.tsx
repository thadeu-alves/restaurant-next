"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/Form";
import { connection } from "@/lib/connection";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const foodFormSchema = z.object({
    title: z
        .string()
        .min(3, "The title must have 3 characters")
        .max(50, "Max lenght of 50"),
    price: z.coerce
        .number({
            required_error: "The price is required",
            invalid_type_error: "Number invalid",
        })
        .positive("Price must be positive"),
    categoryId: z.string().min(1, "Select a category"),
    urlImg: z
        .string()
        .url("Url invalid")
        .optional()
        .or(z.literal("")),
});

export interface FormProps {
    title: string;
    price: number;
    categoryId: string;
    urlImg: string;
    isUpdate: boolean;
    id?: number;
}

type FoodFormData = z.infer<typeof foodFormSchema>;

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FoodFormData>({
        resolver: zodResolver(foodFormSchema),
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
        setLoading(true);
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
                          id: id?.toString(),
                          price: Number(data.price),
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
        } // finally {
        //     setTimeout(() => {
        //         window.location.reload();
        //         setLoading(false);
        //     }, 500);
        // }
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
                    {errors.categoryId?.message && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.categoryId?.message}
                        </p>
                    )}
                </div>

                <Form.Label
                    title="urlImg"
                    register={register}
                    label="Image URL (optional)"
                    type="url"
                />

                <Form.Submit
                    isLoading={loading}
                    text="Add Food Item"
                />
            </form>
        </Form.Container>
    );
}
