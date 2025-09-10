"use client";

import { useEffect, useState } from "react";
import { IFood } from "@/types";
import { FoodList } from "./ui/FoodList";
import { connection } from "@/lib/connection";
import { Section } from "./ui/Section";

export function FeaturedFoods() {
    const [foods, setFoods] = useState<IFood[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await connection.get("/foods");
                const { data } = await res.json();

                setFoods(data);
            } catch (err) {
                console.log(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <Section.Container>
            <Section.Header>
                <Section.Title invert={false}>
                    Featured Foods
                </Section.Title>
                <Section.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </Section.Sub>
            </Section.Header>
            <FoodList
                foods={foods ? foods.slice(0, 6) : []}
                loading={loading}
            />
        </Section.Container>
    );
}
