import { FeaturedFoods } from "./componets/FeaturedFoods";
import { Hero } from "./componets/Hero";

export default function Home() {
    return (
        <div className="space-y-8">
            <Hero />
            <FeaturedFoods />
        </div>
    );
}
