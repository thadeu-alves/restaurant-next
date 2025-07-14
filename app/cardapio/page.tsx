import { FoodList } from "../componets/FoodList";
import { PageHeader } from "../componets/PageHeader";
import { ButtonLink } from "../componets/ui/ButtonLink";

export default function page() {
    return (
        <div className="p-4 py-6 space-y-8 container mx-auto">
            <PageHeader>Restaurant</PageHeader>
            <h1 className="font-bold text-2xl text-center">
                Special Menu
            </h1>
            <FoodList />
            <div className="max-w-80 mx-auto mt-6">
                <ButtonLink color="bg-green-500">
                    DELIVERY NOW
                </ButtonLink>
            </div>
        </div>
    );
}
