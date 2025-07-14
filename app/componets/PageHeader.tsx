"use client";

import Image from "next/image";

export function PageHeader({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center gap-4 cursor-pointer">
            <button
                onClick={() => {
                    window.history.back();
                }}
                className="rounded-full border-3 border-black"
            >
                <Image
                    alt="back icon"
                    src="/back.svg"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                />
            </button>
            <h1 className="font-semibold text-xl">
                {children}
            </h1>
        </div>
    );
}
