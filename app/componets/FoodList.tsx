"use client";

import { Categoria } from "@/types";
import { useEffect, useState } from "react";
import { Food } from "./Food";

export function FoodList() {
    const [categorias, setCategorias] = useState<
        Categoria[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/comidas"
                );
                const data = await res.json();
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
            {categorias.map((cat) => {
                return (
                    <div
                        key={cat.id}
                        className="space-y-6 mb-6 container mx-auto"
                    >
                        <h1 className="text-center text-primary text-lg uppercase">
                            {cat.nome}
                        </h1>
                        <ul className="space-y-4 grid grid-cols-3 grid-rows-1fr gap-4 lg:grid-cols-4">
                            {cat.comidas?.map(
                                ({ id, preco, titulo }) => {
                                    return (
                                        <Food
                                            preco={preco}
                                            titulo={titulo}
                                            key={id}
                                        />
                                    );
                                }
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
