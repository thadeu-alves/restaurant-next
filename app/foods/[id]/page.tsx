"use client";
import { FoodView } from "@/app/components/ui/FoodView";
import { Header } from "@/app/components/ui/Header";
import { Loading } from "@/app/components/ui/Loading";
import { Section } from "@/app/components/ui/Section";
import { connection } from "@/lib/connection";
import { IFood } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    const [food, setFood] = useState<IFood>();
    const [loading, setLoading] = useState(false);

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
    }, [id]);

    return (
        <Section.Container>
            <Header />

            <div>
                <Loading loading={loading} />

                {food && <FoodView {...food} />}

                {error && (
                    <h1 className="font-semibold text-xl text-center">
                        {error}
                    </h1>
                )}
            </div>
        </Section.Container>
    );
}
