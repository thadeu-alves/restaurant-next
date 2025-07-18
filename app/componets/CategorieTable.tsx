"use client";

import { Categoria } from "@/types";
import { useEffect, useState } from "react";
import { Table } from "./ui/Table";

export function CategorieTable() {
    const [categories, setCategories] = useState<
        Categoria[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            async function fetchData() {
                const data = await fetch(
                    "http://localhost:3000/api/comidas"
                );
                const res = await data.json();

                console.log(res);

                setCategories(res);
            }

            fetchData();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    async function handleDelete(id: number) {
        try {
            setLoading(true);
            const data = await fetch(
                "http://localhost:3000/api/categorias",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoriaId: id,
                    }),
                }
            );
            const res = await data.json();
            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-xl">
            <Table.Container>
                <Table.Head>
                    <Table.HeadElement>
                        Title
                    </Table.HeadElement>
                    <Table.HeadElement>
                        Foods Quantity
                    </Table.HeadElement>
                    <Table.HeadElement>
                        <span className="sr-only">
                            Delete
                        </span>
                    </Table.HeadElement>
                </Table.Head>
                <Table.Body>
                    {loading ? (
                        <tr>
                            <th>Loading...</th>
                        </tr>
                    ) : (
                        categories?.map((cat) => {
                            return (
                                <Table.BodyElement
                                    key={cat.id}
                                >
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {cat.nome}
                                    </td>
                                    <td className="text-center">
                                        {
                                            cat.comidas
                                                ?.length
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                                            onClick={() =>
                                                handleDelete(
                                                    cat.id
                                                )
                                            }
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </Table.BodyElement>
                            );
                        })
                    )}
                </Table.Body>
            </Table.Container>
        </div>
    );
}
