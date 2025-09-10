import Image from "next/image";
import Link from "next/link";
import { Section } from "./ui/Section";

export function Hero() {
    return (
        <div className="bg-primary">
            <div className="p-12 text-white flex flex-col gap-8 container mx-auto md:flex-row-reverse md:justify-between lg:px-28">
                <Image
                    alt="back icon"
                    src="/food.png"
                    width={200}
                    height={200}
                    className="w-50 h-50 object-cover rounded-full border-2 border-white md:w-60 md:h-60 lg:w-80 lg:h-80"
                />

                <div className="space-y-4 md:space-y-6 lg:space-y-8 lg:my-auto">
                    <Section.Title invert>
                        Every Nigth <br /> Sparkles With
                        Adbi
                    </Section.Title>
                    <hr className="bg-gray-50 h-0.5 w-full max-w-100" />
                    <Section.Sub
                        invert
                        className="max-w-80"
                    >
                        Lorem Ipsum is simply dummy text of
                        the printing and typesetting
                        industry.
                    </Section.Sub>
                    <Link
                        className="text-primary bg-white px-4 py-2 font-medium rounded-tr-2xl lg:text-xl lg:px-6 lg:py-3 hover:bg-gray-100"
                        href="/menu"
                    >
                        Order Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
