"use client";

import { Category } from "@/types";
import { useEffect, useState } from "react";
import { FoodList } from "./ui/FoodList";
import { connection } from "@/lib/connection";

export function MenuFoods() {
    const [categorias, setCategorias] = useState<
        Category[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await connection.get(
                    "/categories"
                );
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

    return (
        <div>
            {loading ? (
                <div className="text-center">
                    Loading...
                </div>
            ) : (
                categorias?.map((cat) => {
                    return (
                        <div
                            key={cat.id}
                            className="space-y-6 mb-6 container mx-auto"
                        >
                            <h1 className="text-center text-primary text-lg uppercase">
                                {cat.name}
                            </h1>
                            <FoodList
                                foods={cat.foods || []}
                                loading={false}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
}
