import { FeaturedFoods } from "./componets/FeaturedFoods";
import { Profile } from "./componets/Profile";

export default function Home() {
    return (
        <div className="space-y-8">
            <Profile />
            <FeaturedFoods />
        </div>
    );
}
