import Image from "next/image";
import { Section } from "./ui/Section";
import { LinkUi } from "./ui/Link";

export function SocialSection() {
    return (
        <Section.Container>
            <div className="space-y-2 text-center lg:space-y-4">
                <Section.Title invert={false}>
                    Contribute With Me
                </Section.Title>
                <Section.Sub invert={false}>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry.
                </Section.Sub>
            </div>
            <div className="flex flex-col gap-8 md:flex-row lg:gap-20">
                <div className="space-y-4">
                    <Image
                        src="https://avatars.githubusercontent.com/u/78249846?v=4"
                        width={500}
                        height={500}
                        alt="My own image"
                        className="w-full rounded-xl"
                    />
                    <div className="text-primary space-y-1">
                        <h1 className="text-2xl font-bold">
                            Discover My Work
                        </h1>
                        <p className="">
                            Lorem Ipsum is simply dummy text
                            of the printing and typesetting
                            industry.
                        </p>
                    </div>
                    <LinkUi href="">My Website</LinkUi>
                </div>
                <div className="space-y-4">
                    <Image
                        src="https://files.tecnoblog.net/wp-content/uploads/2020/04/github-capa.jpg"
                        width={500}
                        height={500}
                        alt="My own image"
                        className="w-full rounded-xl aspect-square object-cover"
                    />
                    <div className="text-primary space-y-1">
                        <h1 className="text-2xl font-bold">
                            GitHub Repository
                        </h1>
                        <p className="">
                            Lorem Ipsum is simply dummy text
                            of the printing and typesetting
                            industry.
                        </p>
                    </div>
                    <LinkUi href="">Link</LinkUi>
                </div>
            </div>
        </Section.Container>
    );
}
