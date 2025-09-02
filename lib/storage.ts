import { Food } from "@/types";

export const storage = {
    get(): Food[] {
        try {
            const data = localStorage.getItem("foods");
            return data ? JSON.parse(data) : [];
        } catch (err) {
            console.log(err);
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
