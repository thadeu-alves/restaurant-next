import { FeaturedFoods } from "./components/FeaturedFoods";
import { Hero } from "./components/Hero";
import { PartnerSection } from "./components/PartnerSection";

export default function Home() {
    return (
        <div className="space-y-8">
            <Hero />
            <FeaturedFoods />
            <PartnerSection />
        </div>
    );
}
