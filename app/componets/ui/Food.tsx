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
    const [carded, setCarded] = useState(false);

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
            setCarded(true);
        }, 1220);
    }

    return (
        <li className="bg-primary text-white p-4 w-full h-full flex justify-between gap-2 rounded-2xl shadow-xl relative">
            <Image
                alt="back icon"
                src="/food.png"
                width={100}
                height={100}
                className="object-cover w-30 h-30 rounded-full my-auto"
            />
            <div className="flex-1 text-center flex flex-col justify-center space-y-2">
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
                        className={`text-primary font-medium py-1 rounded-2xl px-2 w-full max-w-40 mx-auto ${
                            loading
                                ? "bg-gray-300"
                                : "bg-white"
                        }`}
                        disabled={loading}
                    >
                        <span className="">
                            {loading
                                ? "Adding..."
                                : carded
                                ? "Into your Card!!"
                                : "Add to Card"}
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
