import Image from "next/image";
import { ButtonLink } from "./ui/ButtonLink";

export function Profile() {
    return (
        <div className="py-6 px-4 space-y-8 border-b-2 border-[var(--primary)]">
            <div className="flex gap-4 items-center px-6">
                <Image
                    alt="back icon"
                    src="/food.png"
                    width={100}
                    height={100}
                    className="object-cover w-32 h-32 rounded-full border-2 border-[var(--primary)]"
                />

                <div className="space-y-4">
                    <h1 className="font-semibold text-3xl">
                        Restaurant
                    </h1>
                    <p className="text-[var(--primary)]">
                        Your special restaurant
                    </p>
                </div>
            </div>
            <ButtonLink color="bg-primary" to="/cardapio">
                Special Menu
            </ButtonLink>
        </div>
    );
}
