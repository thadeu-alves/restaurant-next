import { CategorieForm } from "../componets/CategorieForm";
import { FoodForm } from "../componets/FoodForm";
import { FoodTable } from "../componets/FoodTable";

export default function page() {
    return (
        <div className="flex flex-col gap-8 items-center px-4 py-6">
            <FoodTable />
            <FoodForm />
            <CategorieForm />
        </div>
    );
}
