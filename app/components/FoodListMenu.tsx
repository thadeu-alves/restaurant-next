"use client";

import { Category } from "@/types";
import { useEffect, useState } from "react";
import { Food } from "./ui/Food";
import { FoodList } from "./ui/FoodList";
import { connection } from "@/lib/connection";

export function FoodListMenu() {
    const [categorias, setCategorias] = useState<
        Category[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await connection.get("/foods");
                const { data } = await res.json();
                setCategorias(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div>
            {categorias?.map((cat) => {
                return (
                    <div
                        key={cat.id}
                        className="space-y-6 mb-6 container mx-auto"
                    >
                        <h1 className="text-center text-primary text-lg uppercase">
                            {cat.name}
                        </h1>
                        <FoodList>
                            {cat.foods?.map(
                                ({ id, price, title }) => {
                                    return (
                                        <Food
                                            id={0}
                                            title={title}
                                            price={price}
                                            key={id}
                                            quantity={1}
                                            categoryId={0}
                                            urlImg=""
                                            showButton
                                        />
                                    );
                                }
                            )}
                        </FoodList>
                    </div>
                );
            })}
        </div>
    );
}
