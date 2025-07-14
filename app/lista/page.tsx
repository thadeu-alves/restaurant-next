"use client";
import { storageFoods } from "@/lib/storage";
import { Food, FoodProps } from "../componets/Food";
import { ButtonLink } from "../componets/ui/ButtonLink";
import { PageHeader } from "../componets/PageHeader";
import Link from "next/link";

interface FoodWithQuantity extends FoodProps {
    quantidade: number;
}

export default function page() {
    function quantityFoods(
        foods: FoodProps[]
    ): FoodWithQuantity[] {
        return foods.reduce(
            (acumulador: FoodWithQuantity[], foodAtual) => {
                const itemExistente = acumulador.find(
                    (item) =>
                        item.titulo === foodAtual.titulo &&
                        item.preco === foodAtual.preco &&
                        item.categoriaId ===
                            foodAtual.categoriaId &&
                        item.urlImg === foodAtual.urlImg
                );

                if (itemExistente) {
                    itemExistente.quantidade++;
                } else {
                    acumulador.push({
                        ...foodAtual,
                        quantidade: 1,
                    });
                }

                return acumulador;
            },
            []
        );
    }

    const foods = storageFoods.get();
    const foodsFinal = quantityFoods(foods);

    return (
        <div className="py-8 space-y-4 container mx-auto">
            <PageHeader>Back</PageHeader>
            <h1 className="text-center text-primary text-xl font-bold uppercase">
                Your Foods List
            </h1>
            {foodsFinal.length > 0 ? (
                <>
                    <ul className="space-y-4 grid grid-cols-3 grid-rows-1fr gap-4 px-4">
                        {foodsFinal.map((food) => {
                            return (
                                <Food
                                    categoriaId=""
                                    preco={food.preco}
                                    showButton={false}
                                    titulo={food.titulo}
                                    urlImg=""
                                    key={foodsFinal.indexOf(
                                        food
                                    )}
                                    quantity={
                                        food.quantidade
                                    }
                                />
                            );
                        })}
                    </ul>
                    <div className="max-w-80 mx-auto mt-6">
                        <ButtonLink color="bg-green-500">
                            DELIVERY NOW
                        </ButtonLink>
                    </div>
                </>
            ) : (
                <div className="text-center py-8 space-y-4">
                    <h1 className="text-2xl font-medium">
                        You do not have Food at your List.
                    </h1>
                    <h2 className="text-xl">
                        Go{" "}
                        <Link
                            href="/"
                            className="underline text-primary"
                        >
                            Back
                        </Link>{" "}
                        and Add.
                    </h2>
                </div>
            )}
        </div>
    );
}
