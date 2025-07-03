"use client";

import { useEffect, useState } from "react";
import { FoodTableRow } from "./ui/FoodTableRow";
import { Comida } from "@/types";

export function FoodTable() {
    const [comidas, setComidas] = useState<Comida[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/comidas",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            all: true,
                        }),
                    }
                );
                const data = await res.json();
                console.log(data);
                setComidas(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-white uppercase bg-[var(--primary)]">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3"
                        >
                            Product name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                        >
                            Category
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                        >
                            Price
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                        >
                            <span className="sr-only">
                                Edit
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <th>Carregando...</th>
                        </tr>
                    ) : (
                        comidas?.map((com) => {
                            return (
                                <FoodTableRow
                                    title={com.titulo}
                                    price={com.preco}
                                    category={
                                        com.categoria
                                            ?.nome || ""
                                    }
                                    id={com.id}
                                    key={com.id}
                                />
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
