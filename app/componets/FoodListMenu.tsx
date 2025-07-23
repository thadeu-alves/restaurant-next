"use client";

import { Categoria } from "@/types";
import { useEffect, useState } from "react";
import { Food } from "./ui/Food";
import { FoodList } from "./ui/FoodList";
import { connection } from "@/lib/connection";

export function FoodListMenu() {
    const [categorias, setCategorias] = useState<
        Categoria[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await connection.get(
                    "/comidas"
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
                            {cat.nome}
                        </h1>
                        <FoodList>
                            {cat.comidas?.map(
                                ({ id, preco, titulo }) => {
                                    return (
                                        <Food
                                            preco={preco}
                                            titulo={titulo}
                                            key={id}
                                            quantity={1}
                                            categoriaId=""
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
