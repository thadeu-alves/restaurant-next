import Image from "next/image";

export function PartnerSection() {
    return (
        <div className="container md:px-12 mx-auto">
            <div className="bg-amber-400 py-8 px-12 text-primary space-y-8 md:rounded lg:py-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <h1 className="text-3xl font-black lg:max-w-80">
                        We Always Provide You The Best In
                        Town
                    </h1>
                    <p className="lg:max-w-80">
                        Lorem Ipsum is simply dummy text of
                        the printing and typesetting
                        industry.
                    </p>
                </div>
                <div>
                    <Image
                        alt="Restaurant inside"
                        src="/lounge.jpg"
                        width={1900}
                        height={1200}
                        className="w-full h-80 object-cover rounded md:h-100"
                    />
                </div>
                <div className="space-y-4 lg:flex lg:items-center lg:gap-12">
                    <div className="bg-primary text-white font-bold w-fit h-fit px-8 py-4 rounded-full cursor-pointer text-nowrap">
                        Partner With Us
                    </div>
                    <ul className="border-y border-y-[var(--primary)] py-8 flex flex-col gap-8 md:flex-row">
                        <li className="font-black text-2xl">
                            <span className="text-amber-700">
                                5+
                            </span>{" "}
                            Years Of Experience
                        </li>
                        <li className="font-black text-2xl">
                            <span className="text-amber-700">
                                100+
                            </span>{" "}
                            Young Riders
                        </li>
                        <li className="font-black text-2xl">
                            <span className="text-amber-700">
                                5K+
                            </span>{" "}
                            Regular Customers
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
