"use client";

import { FoodProps } from "@/app/componets/Food";
import { FoodForm } from "@/app/componets/FoodForm";
import { useEffect, useState } from "react";

interface PageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: PageProps) {
    const { id } = params;
    const [data, setData] = useState<FoodProps[]>([]);

    useEffect(() => {
        async function fetchData() {
            const da = await fetch(
                `http://localhost:3000/api/comida`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: parseInt(id),
                    }),
                }
            );
            const res = await da.json();
            console.log(res);
            setData(res);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {data[0] && (
                <FoodForm
                    categoriaId={data[0]?.categoriaId}
                    preco={data[0]?.preco}
                    titulo={data[0]?.titulo}
                    urlImg={data[0]?.urlImg}
                    id={parseInt(id)}
                    isUpdate={true}
                />
            )}
        </div>
    );
}
