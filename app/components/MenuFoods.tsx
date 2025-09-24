"use client";

import { IFood } from "@/types";
import { useEffect, useState } from "react";
import { FoodList } from "./ui/FoodList";
import { connection } from "@/lib/connection";

export function MenuFoods() {
    const [data, setData] = useState<IFood[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await connection.get("/foods");
                const { data } = await res.json();
                setData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="space-y-6 container mx-auto">
            <h1 className="text-primary text-lg font-bold uppercase">
                Recomended
            </h1>
            <div>
                {data && (
                    <FoodList
                        foods={data}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}
