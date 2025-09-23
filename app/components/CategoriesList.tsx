"use client";

import { connection } from "@/lib/connection";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CategoriesList() {
    const [categories, setCategories] =
        useState<Category[]>();

    useEffect(() => {
        async function fetchData() {
            const res = await connection.get("/categories");
            const { data } = await res.json();
            setCategories(data);
        }
        fetchData();
    }, []);

    return (
        <div className="space-y-6 mb-6 container mx-auto">
            <h1 className="text-primary text-lg font-bold uppercase">
                Choose Category
            </h1>

            <div className="flex flex-wrap gap-4">
                {categories?.map((category, id) => {
                    return (
                        <Link key={id} href="">
                            <div className="flex flex-col text-center">
                                <div className="border border-[var(--primary)] rounded-2xl overflow-hidden">
                                    <Image
                                        src={
                                            category.urlImg ||
                                            ""
                                        }
                                        width={100}
                                        height={100}
                                        alt=""
                                        className="h-30 w-30 object-cover"
                                    />
                                </div>
                                <h1 className="font-semibold text-primary">
                                    {category.name}
                                </h1>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
