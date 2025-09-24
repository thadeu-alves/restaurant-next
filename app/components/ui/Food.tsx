"use client";
import { storage } from "@/lib/storage";
import { IFood } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Food({
    title,
    price,
    categoryId,
    urlImg,
    quantity = 1,
}: IFood) {
    const [loading, setLoading] = useState(false);
    const [carded, setCarded] = useState(false);

    const path = usePathname();

    console.log(path);

    function handleAdd() {
        setLoading(true);
        storage.add({
            title,
            price,
            categoryId,
            urlImg,
            id: 0,
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
                src={urlImg ? urlImg : "/food.png"}
                width={100}
                height={100}
                className="object-cover w-30 h-30 rounded-full my-auto"
            />
            <div className="flex-1 text-center flex flex-col justify-center space-y-2">
                <h1 className="font-semibold text-xl">
                    {title}
                </h1>
                <h2 className="text-amber-400 font-semibold text-2xl">
                    R$
                    {price}
                </h2>
                {path != "/cart" && (
                    <button
                        onClick={handleAdd}
                        className={`cursor-pointer text-primary font-medium py-1 rounded-2xl px-2 w-full max-w-40 mx-auto ${
                            loading
                                ? "bg-gray-300"
                                : "bg-white"
                        } hover:bg-gray-300`}
                        disabled={loading}
                    >
                        <span className="">
                            {loading
                                ? "Adding..."
                                : carded
                                ? "Into your Cart!!"
                                : "Add to Cart"}
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
