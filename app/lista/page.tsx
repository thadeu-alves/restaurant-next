"use client";
import { storageFoods } from "@/lib/storage";
import { Food, FoodProps } from "../componets/Food";
import { ButtonLink } from "../componets/ui/ButtonLink";

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
        <div className="py-8 space-y-4">
            <h1 className="text-center text-primary text-xl font-bold uppercase">
                Your Foods List
            </h1>
            <ul className="space-y-4 grid grid-cols-3 grid-rows-1fr gap-4 px-4">
                {foodsFinal.map((food) => {
                    return (
                        <Food
                            categoriaId=""
                            preco={food.preco}
                            showButton={false}
                            titulo={food.titulo}
                            urlImg=""
                            key={foodsFinal.indexOf(food)}
                            quantity={food.quantidade}
                        />
                    );
                })}
            </ul>
            <div className="max-w-80 mx-auto mt-6">
                <ButtonLink color="bg-green-500">
                    DELIVERY NOW
                </ButtonLink>
            </div>
        </div>
    );
}
