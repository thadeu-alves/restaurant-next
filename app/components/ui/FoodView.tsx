"use client";
import { IFood } from "@/types";
import Image from "next/image";
import { LinkUi } from "./Link";
import { useState } from "react";

export function FoodView({
    title,
    description,
    price,
    urlImg,
}: IFood) {
    const [counter, setCounter] = useState(0);

    return (
        <div className="mt-8 flex flex-col items-center gap-12">
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:gap-48">
                <div>
                    <Image
                        src={urlImg}
                        alt=""
                        width={200}
                        height={200}
                        className="w-50 h-50 object-cover rounded-full border-2 border-[var(--primary)] md:w-60 md:h-60 lg:w-80 lg:h-80"
                    />
                </div>
                <div className="space-y-6 text-center lg:text-left">
                    <div className="space-y-2">
                        <h1 className="font-medium text-4xl">
                            {title}
                        </h1>
                        <ul className="flex gap-2 justify-center lg:justify-start">
                            {["", "", "", "", ""].map(
                                (_, id) => (
                                    <li key={id}>
                                        <Image
                                            src="/star.svg"
                                            width={30}
                                            height={30}
                                            alt=""
                                            className="w-6"
                                        />
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <p className="font-light text-xl max-w-96">
                        {description}
                    </p>
                    <h2 className="font-semibold text-4xl ">
                        R$ {price},00
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-8 lg:gap-12">
                <div className="bg-[#ECECEC] flex items-center gap-4 p-2 rounded">
                    <button
                        onClick={() =>
                            counter > 0
                                ? setCounter(counter - 1)
                                : setCounter(0)
                        }
                        className="bg-white text-primary px-3 text-4xl rounded-md flex justify-center items-center"
                    >
                        -
                    </button>
                    <div className="text-2xl">
                        {counter}
                    </div>
                    <button
                        onClick={() =>
                            counter < 10
                                ? setCounter(counter + 1)
                                : setCounter(10)
                        }
                        className="bg-primary h-full text-white px-3 text-4xl rounded-md flex justify-center items-center"
                    >
                        +
                    </button>
                </div>
                <LinkUi href="">Add to Cart</LinkUi>
            </div>
        </div>
    );
}
