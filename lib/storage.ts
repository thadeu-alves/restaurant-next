import { Food } from "@/types";

export const storageFoods = {
    get(): Food[] {
        try {
            const data = localStorage.getItem("foods");
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },
    add(food: Food) {
        const foods = this.get();
        foods.push(food);
        localStorage.setItem(
            "foods",
            JSON.stringify(foods)
        );
    },
};
