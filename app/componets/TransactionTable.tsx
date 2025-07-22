"use client";

import { useEffect, useState } from "react";
import { Table } from "./ui/Table";
import { Transaction } from "@prisma/client";
import Image from "next/image";
import { connection } from "@/lib/connection";

export function TransactionTable() {
    const [transactions, setTransactions] = useState<
        Transaction[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filtered, setFiltered] = useState<Transaction[]>(
        []
    );
    const [sortDirection, setSortDirection] = useState<
        "asc" | "desc"
    >("asc");
    const [sorted, setSorted] = useState<
        "amount" | "type" | null
    >(null);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            try {
                const res = await connection.get(
                    "/transacoes"
                );
                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const data = [...transactions];

        if (sorted) {
            data.sort((a, b) => {
                const aValue =
                    sorted === "type" ? a.type : a.amount;
                const bValue =
                    sorted === "type" ? b.type : b.amount;
                if (aValue < bValue)
                    return sortDirection === "asc" ? -1 : 1;
                if (aValue > bValue)
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFiltered(data);
    }, [sortDirection, sorted, transactions]);

    async function handleDelete(id: number) {
        setIsLoading(true);
        try {
            const res = await connection.delete(
                "/transacoes",
                JSON.stringify({ id })
            );

            if (!res.ok) {
                alert("can't delete");
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSort(column: "amount" | "type") {
        if (sorted == column) {
            setSortDirection(
                sortDirection === "asc" ? "desc" : "asc"
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
                    onClick={() => handleSort("amount")}
                >
                    Amount
                    <Image
                        src="/ascdesc.svg"
                        width={20}
                        height={20}
                        alt="asc or desc icon"
                        className={
                            sortDirection === "asc" &&
                            sorted === "amount"
                                ? ""
                                : "rotate-180"
                        }
                    />
                </Table.HeadElement>

                <Table.HeadElement>
                    Description
                </Table.HeadElement>
                <Table.HeadElement
                    onClick={() => handleSort("type")}
                >
                    Type
                    <Image
                        src="/ascdesc.svg"
                        width={20}
                        height={20}
                        alt="asc or desc icon"
                        className={
                            sortDirection === "asc" &&
                            sorted === "type"
                                ? ""
                                : "rotate-180"
                        }
                    />
                </Table.HeadElement>
                <Table.HeadElement>
                    <span className="sr-only">Delete</span>
                </Table.HeadElement>
            </Table.Head>
            <Table.Body>
                {isLoading ? (
                    <tr>
                        <th>Loading...</th>
                    </tr>
                ) : (
                    filtered?.map((trans, id) => {
                        return (
                            <Table.BodyElement key={id}>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {trans.amount}
                                </td>

                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {trans.description}
                                </td>
                                <td
                                    scope="row"
                                    className={`px-6 py-4 font-medium whitespace-nowrap ${
                                        trans.type ==
                                        "INCOME"
                                            ? "text-green-400"
                                            : "text-red-800"
                                    }`}
                                >
                                    {trans.type}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        onClick={() =>
                                            handleDelete(
                                                trans.id
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
    );
}
