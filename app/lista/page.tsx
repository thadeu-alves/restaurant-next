"use client";
import { storageFoods } from "@/lib/storage";
import { Food, FoodProps } from "../componets/ui/Food";
import { ButtonLink } from "../componets/ui/ButtonLink";
import { PageBackButton } from "../componets/ui/PageBackButton";
import Link from "next/link";
import { PageTitle } from "../componets/ui/PageTitle";
import { FoodList } from "../componets/ui/FoodList";

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
        <div className="p-12 space-y-8 container mx-auto">
            <PageBackButton>Back</PageBackButton>
            <div className="text-center space-y-4">
                <PageTitle.Title invert={false}>
                    Your Card
                </PageTitle.Title>
                <PageTitle.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </PageTitle.Sub>
            </div>
            {foodsFinal?.length > 0 ? (
                <>
                    <FoodList>
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
                    </FoodList>
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
