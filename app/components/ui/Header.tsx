import Image from "next/image";
import { PageBackButton } from "./PageBackButton";

export function Header() {
    return (
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
    );
}
