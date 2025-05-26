"use client";

import { Categoria } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

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
                        className="space-y-6 mb-6"
                    >
                        <h1 className="text-center text-amber-400 text-lg">
                            {cat.nome}
                        </h1>
                        <ul className="space-y-4">
                            {cat.comidas?.map((com) => {
                                return (
                                    <li
                                        key={com.id}
                                        className="border-2 border-black rounded-2xl flex justify-between items-center pr-4 overflow-hidden shadow-md"
                                    >
                                        <Image
                                            alt="back icon"
                                            src="/food.png"
                                            width={50}
                                            height={50}
                                            className="object-cover w-25 h-20"
                                        />
                                        <h1 className="font-semibold text-xl">
                                            {com.titulo}{" "}
                                        </h1>
                                        <h1 className="text-amber-400 font-semibold text-2xl">
                                            R$
                                            {com.preco}
                                        </h1>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
