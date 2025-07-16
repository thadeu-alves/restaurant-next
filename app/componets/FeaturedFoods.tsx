"use client";

import { useEffect, useState } from "react";
import { Food, FoodProps } from "./ui/Food";
import { Categoria } from "@/types";
import { FoodList } from "./ui/FoodList";
import { PageTitle } from "./ui/PageTitle";

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
        <div className="p-12 space-y-6 container mx-auto lg:space-y-12">
            <div className="space-y-2 text-center lg:space-y-4">
                <PageTitle.Title invert={false}>
                    FeaturedFoods
                </PageTitle.Title>
                <PageTitle.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </PageTitle.Sub>
            </div>
            <FoodList>
                {foods?.map((food) => {
                    return (
                        <Food
                            titulo={food.titulo}
                            categoriaId="0"
                            preco={food.preco}
                            urlImg=""
                            key={foods.indexOf(food)}
                            showButton
                            quantity={1}
                        />
                    );
                })}
            </FoodList>
        </div>
    );
}
