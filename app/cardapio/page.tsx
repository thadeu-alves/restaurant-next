import { FoodList } from "../componets/FoodList";
import PageHeader from "../componets/PageHeader";

export default function page() {
    return (
        <div className="p-4 py-6 space-y-8">
            <PageHeader>Restaurant</PageHeader>
            <h1 className="font-bold text-2xl text-center">
                Special Menu
            </h1>
            <FoodList />
            <div className="bg-green-500 w-1/2 text-center py-2 rounded text-white mx-auto">
                <h1 className="font-semibold ">
                    DELIVERY NOW
                </h1>
            </div>
        </div>
    );
}
