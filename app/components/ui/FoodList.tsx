import { IFood } from "@/types";
import { Food } from "./Food";

interface IFoodList {
    foods: IFood[];
    loading: boolean;
}

export function FoodList({ foods, loading }: IFoodList) {
    return (
        <ul className="space-y-4 grid grid-cols-1 grid-rows-1fr gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {loading ? (
                <div className="text-center">
                    Loading...
                </div>
            ) : foods ? (
                foods?.map(
                    (
                        { title, price, urlImg, quantity },
                        id
                    ) => {
                        return (
                            <Food
                                id={id}
                                title={title}
                                categoryId={0}
                                price={price}
                                urlImg={urlImg}
                                key={id}
                                quantity={quantity || 1}
                            />
                        );
                    }
                )
            ) : (
                <div>No Foods!!</div>
            )}
        </ul>
    );
}
