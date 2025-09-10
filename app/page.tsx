import { FeaturedFoods } from "./components/FeaturedFoods";
import { Hero } from "./components/Hero";
import { PartnerSection } from "./components/PartnerSection";
import { SocialSection } from "./components/SocialSection";

export default function Home() {
    return (
        <div className="space-y-8">
            <Hero />
            <FeaturedFoods />
            <PartnerSection />
            <SocialSection />
        </div>
    );
}
