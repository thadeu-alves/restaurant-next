"use client";

import { useEffect, useState } from "react";
import { FoodTableRow } from "./ui/FoodTableRow";
import Image from "next/image";
import { Table } from "./ui/Table";
import { connection } from "@/lib/connection";
import { IFood } from "@/types";

export function FoodTable() {
    const [foods, setFoods] = useState<IFood[]>([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState<IFood[]>([]);
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
                const res = await connection.get("/foods");
                const { data } = await res.json();
                setFoods(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const data = [...foods];

        if (sorted) {
            data.sort((a, b) => {
                const aValue =
                    sorted === "title" ? a.title : a.price;
                const bValue =
                    sorted === "title" ? b.title : b.price;
                if (aValue < bValue)
                    return sortDirection === "asc" ? -1 : 1;
                if (aValue > bValue)
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFiltered(data);
    }, [sortDirection, sorted, foods]);

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
        <Table.Container>
            <Table.Head>
                <Table.HeadElement
                    onClick={() => handleSort("title")}
                >
                    Product name{" "}
                    <Image
                        src="/ascdesc.svg"
                        width={20}
                        height={20}
                        alt="asc or desc icon"
                        className={
                            sortDirection === "asc" &&
                            sorted === "title"
                                ? ""
                                : "rotate-180"
                        }
                    />
                </Table.HeadElement>
                <Table.HeadElement>
                    Category
                </Table.HeadElement>
                <Table.HeadElement
                    onClick={() => handleSort("price")}
                >
                    Price
                    <Image
                        src="/ascdesc.svg"
                        width={20}
                        height={20}
                        alt="asc or desc icon"
                        className={
                            sortDirection === "asc" &&
                            sorted === "price"
                                ? ""
                                : "rotate-180"
                        }
                    />
                </Table.HeadElement>
                <Table.HeadElement>
                    <span className="sr-only">Edit</span>
                </Table.HeadElement>
            </Table.Head>
            <Table.Body>
                {loading ? (
                    <tr>
                        <th>Carregando...</th>
                    </tr>
                ) : (
                    filtered.length > 0 &&
                    filtered?.map(
                        ({
                            title,
                            price,
                            category,
                            id,
                        }) => {
                            return (
                                <FoodTableRow
                                    title={title}
                                    price={price}
                                    category={
                                        category?.name || ""
                                    }
                                    id={id}
                                    key={id}
                                />
                            );
                        }
                    )
                )}
            </Table.Body>
        </Table.Container>
    );
}
