"use client";

import { useEffect, useState } from "react";
import { Food, FoodProps } from "./Food";
import { Categoria } from "@/types";

export function FeaturedFoods() {
    const [foods, setFoods] = useState<FoodProps[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch(
                    "http://localhost:3000/api/comidas"
                );
                const data = await res.json();

                const allFoods = data.flatMap(
                    (categoria: Categoria) =>
                        categoria.comidas
                );

                const sortedFoods = allFoods.sort(
                    (a: FoodProps, b: FoodProps) =>
                        parseFloat(a.preco) -
                        parseFloat(b.preco)
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-center text-primary text-xl font-bold uppercase">
                Featured Foods
            </h1>
            <ul className="space-y-4 grid grid-cols-3 grid-rows-1fr gap-4 px-4 lg:grid-cols-4">
                {foods?.map((food) => {
                    return (
                        <Food
                            titulo={food.titulo}
                            categoriaId="0"
                            preco={food.preco}
                            urlImg=""
                            key={foods.indexOf(food)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
