"use client";

import { useEffect, useState } from "react";
import { FoodTableRow } from "./ui/FoodTableRow";
import { Comida } from "@/types";
import Image from "next/image";

export function FoodTable() {
    const [comidas, setComidas] = useState<Comida[]>([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState<Comida[]>([]);
    const [sortDirection, setSortDirection] = useState<
        "asc" | "desc"
    >("asc");
    const [sorted, setSorted] = useState<
        "title" | "price" | null
    >(null);

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

    useEffect(() => {
        const data = [...comidas];

        if (sorted) {
            data.sort((a, b) => {
                const aValue =
                    sorted === "title"
                        ? a.titulo
                        : parseFloat(a.preco);
                const bValue =
                    sorted === "title"
                        ? b.titulo
                        : parseFloat(b.preco);
                if (aValue < bValue)
                    return sortDirection === "asc" ? -1 : 1;
                if (aValue > bValue)
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFiltered(data);
    }, [sortDirection, sorted, comidas]);

    function handleSort(column: "title" | "price") {
        if (sorted === column) {
            setSortDirection(
                sortDirection == "asc" ? "desc" : "asc"
            );
        } else {
            setSorted(column);
            setSortDirection("asc");
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-white uppercase bg-[var(--primary)]">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 flex justify-center items-center gap-4 cursor-pointer"
                            onClick={() =>
                                handleSort("title")
                            }
                        >
                            Product name{" "}
                            <Image
                                src="/ascdesc.svg"
                                width={20}
                                height={20}
                                alt="asc or desc icon"
                                className={
                                    sortDirection ===
                                        "asc" &&
                                    sorted === "title"
                                        ? ""
                                        : "rotate-180"
                                }
                            />
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                        >
                            Category
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 flex justify-center items-center gap-4 cursor-pointer"
                            onClick={() =>
                                handleSort("price")
                            }
                        >
                            Price
                            <Image
                                src="/ascdesc.svg"
                                width={20}
                                height={20}
                                alt="asc or desc icon"
                                className={
                                    sortDirection ===
                                        "asc" &&
                                    sorted === "price"
                                        ? ""
                                        : "rotate-180"
                                }
                            />
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
                        filtered.length > 0 &&
                        filtered?.map((com) => {
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
