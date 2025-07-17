import { FoodForm } from "@/app/componets/FoodForm";
import { FoodTable } from "@/app/componets/FoodTable";

export default function page() {
    return (
        <div className="flex flex-1 justify-center items-center p-12">
            <FoodForm
                categoriaId=""
                preco=""
                titulo=""
                urlImg=""
                isUpdate={false}
            />
            <FoodTable />
        </div>
    );
}
