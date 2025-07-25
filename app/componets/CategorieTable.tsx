"use client";

import { Category } from "@/types";
import { useEffect, useState } from "react";
import { Table } from "./ui/Table";
import { connection } from "@/lib/connection";

export function CategorieTable() {
    const [categories, setCategories] = useState<
        Category[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            async function fetchData() {
                setLoading(true);
                const res = await connection.get("/foods");
                const { data } = await res.json();
                setCategories(data);
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
            const data = await connection.delete(
                "/categorias",
                JSON.stringify({
                    categoriaId: id,
                })
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
        <Table.Container>
            <Table.Head>
                <Table.HeadElement>Title</Table.HeadElement>
                <Table.HeadElement>
                    Foods Quantity
                </Table.HeadElement>
                <Table.HeadElement>
                    <span className="sr-only">Delete</span>
                </Table.HeadElement>
            </Table.Head>
            <Table.Body>
                {loading ? (
                    <tr>
                        <th>Loading...</th>
                    </tr>
                ) : (
                    categories?.map(
                        ({ name, foods, id }) => {
                            return (
                                <Table.BodyElement key={id}>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {name}
                                    </td>
                                    <td className="text-center">
                                        {foods?.length}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                                            onClick={() =>
                                                handleDelete(
                                                    id
                                                )
                                            }
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </Table.BodyElement>
                            );
                        }
                    )
                )}
            </Table.Body>
        </Table.Container>
    );
}
