import { MenuFoods } from "../components/MenuFoods";
import { PageBackButton } from "../components/ui/PageBackButton";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Section } from "../components/ui/Section";
import Image from "next/image";

export default function page() {
    return (
        <div className="p-12 space-y-8 container mx-auto lg:space-y-18">
            <div className="flex justify-between">
                <PageBackButton />
                <div className="flex">
                    <div className="bg-[#ECECEC] rounded-l flex justify-center items-center px-2 py-2">
                        <Image
                            src="/search.svg"
                            width={30}
                            height={30}
                            alt=""
                            className="w-6"
                        />
                    </div>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="bg-[#ECECEC] px-2 rounded-r focus:outline-0"
                    />
                </div>
            </div>
            <div className="text-center space-y-4">
                <Section.Title invert={false}>
                    Special Menu
                </Section.Title>
                <Section.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </Section.Sub>
            </div>
            <MenuFoods />
            <div className="max-w-80 mx-auto mt-6">
                <ButtonLink color="bg-green-500">
                    DELIVERY NOW
                </ButtonLink>
            </div>
        </div>
    );
}
