"use client";

import { FoodForm } from "@/app/components/FoodForm";
import { connection } from "@/lib/connection";
import { Food } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id as string;
    const [data, setData] = useState<Food[]>([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const res = await connection.post(
                "/comida",
                JSON.stringify({
                    id: parseInt(id),
                })
            );
            const da = await res.json();
            setData(da);
        }
        fetchData();
    }, [id]);

    async function handleDelete() {
        try {
            const res = await fetch(
                "http://localhost:3000/api/comidas",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        comidaId: parseInt(id),
                    }),
                }
            );
            const data = res.json();
            console.log(data);
        } catch (err) {
            console.log(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred"
            );
        } finally {
            router.back();
        }
    }

    return (
        <div className="flex-1 p-12 space-y-8 my-auto">
            {data[0] && (
                <FoodForm
                    categoryId={data[0]?.categoryId.toString()}
                    price={data[0]?.price}
                    title={data[0]?.title}
                    urlImg={data[0]?.urlImg}
                    id={parseInt(id)}
                    isUpdate={true}
                />
            )}
            <div className="w-full flex justify-center">
                <button
                    className="text-center text-red-500 font-semibold cursor-pointer hover:text-red-800"
                    onClick={handleDelete}
                >
                    Delete this Item
                </button>
            </div>
        </div>
    );
}
