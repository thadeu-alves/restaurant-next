"use client";

import { useEffect, useState } from "react";
import { Category, IFood } from "@/types";
import { FoodList } from "./ui/FoodList";
import { PageTitle } from "./ui/PageTitle";
import { connection } from "@/lib/connection";

export function FeaturedFoods() {
    const [foods, setFoods] = useState<IFood[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await connection.get("/foods");
                const { data } = await res.json();

                const allFoods = data.flatMap(
                    (categoria: Category) => categoria.foods
                );

                const sortedFoods = allFoods.sort(
                    (a: IFood, b: IFood) =>
                        a.price - b.price
                );

                setFoods(sortedFoods);
            } catch (err) {
                console.log(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="p-12 space-y-6 container mx-auto lg:space-y-12">
            <div className="space-y-2 text-center lg:space-y-4">
                <PageTitle.Title invert={false}>
                    Featured Foods
                </PageTitle.Title>
                <PageTitle.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </PageTitle.Sub>
            </div>
            <FoodList
                foods={foods ? foods.slice(0, 6) : []}
                loading={loading}
            />
        </div>
    );
}
