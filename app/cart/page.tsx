"use client";
import { storage } from "@/lib/storage";
import { ButtonLink } from "../components/ui/ButtonLink";
import { PageBackButton } from "../components/ui/PageBackButton";
import Link from "next/link";
import { PageTitle } from "../components/ui/PageTitle";
import { FoodList } from "../components/ui/FoodList";
import { IFood } from "@/types";

function quantityFoods(foods: IFood[]): IFood[] {
    return foods.reduce((acumulador: IFood[], actual) => {
        const item = acumulador.find(
            (item) =>
                item.title === actual.title &&
                item.price === actual.price &&
                item.categoryId === actual.categoryId &&
                item.urlImg === actual.urlImg
        );

        if (item) {
            if (item.quantity) {
                item.quantity++;
            }
        } else {
            acumulador.push({
                ...actual,
                quantity: 1,
            });
        }

        return acumulador;
    }, []);
}

export default function page() {
    const foods = storage.get();
    const foodsFinal = quantityFoods(foods);

    return (
        <div className="p-12 space-y-18 container mx-auto">
            <PageBackButton />

            <div className="text-center space-y-4">
                <PageTitle.Title invert={false}>
                    Your Cart
                </PageTitle.Title>
                <PageTitle.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </PageTitle.Sub>
            </div>

            {foods?.length > 0 ? (
                <>
                    <FoodList
                        foods={foodsFinal || []}
                        loading={false}
                    />
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
