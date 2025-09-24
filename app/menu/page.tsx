import { CategoriesList } from "../components/CategoriesList";
import { MenuFoods } from "../components/MenuFoods";
import { Header } from "../components/ui/Header";
import { Section } from "../components/ui/Section";

export default function page() {
    return (
        <Section.Container>
            <Header />
            <CategoriesList />
            <MenuFoods />
        </Section.Container>
    );
}
