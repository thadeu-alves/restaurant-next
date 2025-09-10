import { MenuFoods } from "../components/MenuFoods";
import { PageBackButton } from "../components/ui/PageBackButton";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Section } from "../components/ui/Section";

export default function page() {
    return (
        <div className="p-12 space-y-8 container mx-auto lg:space-y-18">
            <PageBackButton />
            <div className="text-center space-y-4">
                <Section.Title invert={false}>
                    Special Menu
                </Section.Title>
                <Section.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </Section.Sub>
            </div>
            <MenuFoods />
            <div className="max-w-80 mx-auto mt-6">
                <ButtonLink color="bg-green-500">
                    DELIVERY NOW
                </ButtonLink>
            </div>
        </div>
    );
}
