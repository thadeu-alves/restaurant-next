"use client";

import Image from "next/image";

export function PageBackButton({
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
                className="rounded-full border-3 border-[var(--primary)]"
            >
                <Image
                    alt="back icon"
                    src="/back.svg"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                />
            </button>
            <h1 className="font-medium text-xl text-primary ">
                {children}
            </h1>
        </div>
    );
}
