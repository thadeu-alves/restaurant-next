import { FeaturedFoods } from "./components/FeaturedFoods";
import { Hero } from "./components/Hero";

export default function Home() {
    return (
        <div className="space-y-8">
            <Hero />
            <FeaturedFoods />
        </div>
    );
}
