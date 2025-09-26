"use client";
import { FoodList } from "@/app/components/ui/FoodList";
import { FoodView } from "@/app/components/ui/FoodView";
import { Header } from "@/app/components/ui/Header";
import { Loading } from "@/app/components/ui/Loading";
import { Section } from "@/app/components/ui/Section";
import { connection } from "@/lib/connection";
import { Category, IFood } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    const [food, setFood] = useState<IFood>();
    const [loading, setLoading] = useState(false);
    const [recommended, setRecommended] =
        useState<Category>();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await connection.get(
                    `/foods/${id}`
                );

                if (!res.ok) {
                    setError("Comida não encontrada.");
                }

                const { data } = await res.json();

                setFood(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, food?.categoryId]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                if (!food?.categoryId) return;

                const res = await connection.get(
                    `/categories/${food?.categoryId}`
                );

                if (!res.ok) {
                    setError(
                        "Erro ao procurar comidas recomendadas."
                    );
                }

                const { data } = await res.json();

                setRecommended(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [food?.categoryId]);

    return (
        <Section.Container>
            <Header />

            <div className="space-y-16">
                <Loading loading={loading} />

                {food && <FoodView {...food} />}

                {recommended && (
                    <div className="space-y-4">
                        <h1 className="text-primary text-lg font-bold uppercase">
                            Recommended
                        </h1>
                        <FoodList
                            foods={recommended.foods || []}
                            loading={loading}
                        />
                    </div>
                )}

                {error && (
                    <h1 className="font-semibold text-xl text-center">
                        {error}
                    </h1>
                )}
            </div>
        </Section.Container>
    );
}
