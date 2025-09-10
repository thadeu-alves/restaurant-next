import { Section } from "./ui/Section";

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
        </Section.Container>
    );
}
