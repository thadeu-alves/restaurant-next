import { CategorieForm } from "../componets/CategorieForm";
import { FoodForm } from "../componets/FoodForm";

export default function page() {
    return (
        <div className="flex flex-col gap-8 items-center px-4 py-6">
            <FoodForm />
            <CategorieForm />
        </div>
    );
}
