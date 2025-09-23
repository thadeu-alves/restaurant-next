import { CategoriesList } from "../components/CategoriesList";
import { MenuFoods } from "../components/MenuFoods";
import { Header } from "../components/ui/Header";

export default function page() {
    return (
        <div className="p-12 space-y-6 container mx-auto lg:space-y-18">
            <Header />
            <CategoriesList />
            <MenuFoods />
        </div>
    );
}
