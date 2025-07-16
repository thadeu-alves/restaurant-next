import { FoodProps } from "@/app/componets/ui/Food";

export const storageFoods = {
    get(): FoodProps[] {
        try {
            const data = localStorage.getItem("foods");
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },
    add(food: FoodProps) {
        const foods = this.get();
        foods.push(food);
        localStorage.setItem(
            "foods",
            JSON.stringify(foods)
        );
    },
};
