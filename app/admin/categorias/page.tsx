import { CategorieForm } from "@/app/componets/CategorieForm";
import { CategorieTable } from "@/app/componets/CategorieTable";

export default function page() {
    return (
        <div className="flex flex-1 justify-center items-center px-12">
            <CategorieForm />
            <CategorieTable />
        </div>
    );
}
