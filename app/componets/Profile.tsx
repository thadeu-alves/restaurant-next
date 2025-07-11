import Image from "next/image";
import { ButtonLink } from "./ui/ButtonLink";

export function Profile() {
    return (
        <div className="py-6 px-4 space-y-8 border-b-2 border-[var(--primary)] container mx-auto">
            <div className="flex items-center px-6 gap-8 justify-center">
                <Image
                    alt="back icon"
                    src="/food.png"
                    width={100}
                    height={100}
                    className="object-cover w-50 h-50 rounded-full border-2 border-[var(--primary)]"
                />

                <div className="space-y-4 w-60">
                    <h1 className="font-semibold text-3xl">
                        Restaurant
                    </h1>
                    <p className="text-[var(--primary)]">
                        Your special restaurant
                    </p>
                    <ButtonLink
                        color="bg-primary"
                        to="/cardapio"
                    >
                        Special Menu
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
}
