"use client";
import { FoodList } from "@/app/components/ui/FoodList";
import { Header } from "@/app/components/ui/Header";
import { Section } from "@/app/components/ui/Section";
import { connection } from "@/lib/connection";
import { Category } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    const [category, setCategory] = useState<Category>();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await connection.get(
                    `/categories/${id}`
                );

                if (!res.ok) {
                    setError("Categoria não encontrada.");
                }

                const { data } = await res.json();

                setCategory(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return (
        <Section.Container>
            <Header />

            <div className="text-center space-y-4">
                <Section.Title invert={false}>
                    {category?.name}
                </Section.Title>
            </div>

            <div>
                <FoodList
                    foods={category?.foods || []}
                    loading={loading}
                />

                {error && (
                    <h1 className="font-semibold text-xl text-center">
                        {error}
                    </h1>
                )}
            </div>
        </Section.Container>
    );
}
