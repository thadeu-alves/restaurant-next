"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminHeader() {
    const links = [
        {
            text: "Home",
            href: "/admin",
        },
        {
            text: "Foods",
            href: "/admin/comidas",
        },
        {
            text: "Categories",
            href: "/admin/categorias",
        },
        {
            text: "Financies",
            href: "/admin/financa",
        },
        {
            text: "Tab",
            href: "/",
        },
    ];

    const path = usePathname();

    return (
        <div className="bg-primary p-12 flex flex-col justify-between">
            <h1
                className={`text-4xl font-black text-[var(--secondary)] text-center`}
            >
                LOGO
            </h1>

            <ul className="flex flex-col gap-4">
                {links.map((link, id) => (
                    <Link href={link.href} key={id}>
                        <li
                            className={`w-full rounded-xl py-1 px-4 font-semibold uppercase text-2xl text-center ${
                                path == link.href ||
                                (link.href ==
                                    "/admin/comidas" &&
                                    path.includes(
                                        "/admin/comidas/"
                                    ))
                                    ? "bg-white text-primary"
                                    : "text-neutral-400"
                            }`}
                        >
                            {link.text}
                        </li>
                    </Link>
                ))}
            </ul>

            <Link
                href="/"
                className="flex justify-center items-center gap-4"
            >
                <Image
                    src="/exit.svg"
                    alt="exit icon"
                    width={30}
                    height={30}
                />
                <h1 className="text-2xl text-white">
                    Exit
                </h1>
            </Link>
        </div>
    );
}
