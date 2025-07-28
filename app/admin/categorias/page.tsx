import { CategorieForm } from "@/app/components/CategorieForm";
import { CategorieTable } from "@/app/components/CategorieTable";

export default function page() {
    return (
        <div className="flex flex-1 justify-center items-center px-12">
            <CategorieForm />
            <CategorieTable />
        </div>
    );
}
