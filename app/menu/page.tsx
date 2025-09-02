import { MenuFoods } from "../components/MenuFoods";
import { PageBackButton } from "../components/ui/PageBackButton";
import { ButtonLink } from "../components/ui/ButtonLink";
import { PageTitle } from "../components/ui/PageTitle";

export default function page() {
    return (
        <div className="p-12 space-y-8 container mx-auto lg:space-y-18">
            <PageBackButton />
            <div className="text-center space-y-4">
                <PageTitle.Title invert={false}>
                    Special Menu
                </PageTitle.Title>
                <PageTitle.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </PageTitle.Sub>
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
