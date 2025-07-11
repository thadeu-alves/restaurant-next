"use client";
import { storageFoods } from "@/lib/storage";
import Image from "next/image";
import { useState } from "react";

export interface FoodProps {
    titulo: string;
    preco: string;
    categoriaId: string;
    urlImg: string;
}

export function Food({
    titulo,
    preco,
    categoriaId,
    urlImg,
    showButton = true,
    quantity = 1,
}: FoodProps & { showButton: boolean; quantity: number }) {
    const [loading, setLoading] = useState(false);

    function handleAdd() {
        setLoading(true);
        storageFoods.add({
            titulo,
            preco,
            categoriaId,
            urlImg,
        });
        setTimeout(() => {
            setLoading(false);
        }, 1220);
    }

    return (
        <li className="space-y-4 p-4 w-full h-full rounded-2xl overflow-hidden shadow-lg flex flex-col border border-gray-200 relative">
            <Image
                alt="back icon"
                src="/food.png"
                width={100}
                height={100}
                className="object-cover w-30 h-30 rounded-full"
            />
            <div className="flex flex-1 flex-col justify-between">
                <h1 className="font-semibold text-xl">
                    {titulo}
                </h1>
                <h2 className="text-amber-400 font-semibold text-2xl">
                    R$
                    {preco}
                </h2>
                {showButton && (
                    <button
                        onClick={handleAdd}
                        className={`text-white mt-2 py-1 rounded-xl px-2 ${
                            loading
                                ? "bg-amber-900"
                                : "bg-primary"
                        }`}
                        disabled={loading}
                    >
                        <span className="">
                            {loading ? "Adding..." : "Add"}
                        </span>
                    </button>
                )}
                {quantity > 1 && (
                    <h1 className="absolute top-0 right-0 m-4 text-xl">
                        x{quantity}
                    </h1>
                )}
            </div>
        </li>
    );
}
