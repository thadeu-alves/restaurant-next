"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AdminHeader() {
    const [open, setOpen] = useState(false);
    const path = usePathname();

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

    function handleOpen() {
        setOpen(!open);
    }

    return (
        <div className="bg-primary flex flex-col md:h-screen lg:w-68 md:top-0 md:left-0 md:justify-between md:py-12">
            <div className="bg-primary px-12 py-6 flex justify-between items-center z-10 md:p-6">
                <h1 className="text-4xl font-black text-[var(--secondary)] mx-auto">
                    LOGO
                </h1>
                <div
                    className="bg-white p-2 rounded-md cursor-pointer md:hidden"
                    onClick={handleOpen}
                >
                    <Image
                        alt="menu icon"
                        src="/menu.svg"
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            <ul
                className={`flex flex-col gap-4 bg-primary absolute left-0 top-23 right-0 p-8 transition-transform duration-300 ease-in-out transform z-1 ${
                    open
                        ? "translate-y-0"
                        : "-translate-y-full"
                } md:static md:flex md:flex-col md:w-full md:translate-y-0 md:p-6`}
            >
                {links.map((link, id) => (
                    <Link
                        href={link.href}
                        key={id}
                        onClick={handleOpen}
                    >
                        <li
                            className={`text-center w-full rounded-xl font-semibold uppercase text-2xl lg:min-w-58 ${
                                path === link.href ||
                                (link.href ===
                                    "/admin/comidas" &&
                                    path.includes(
                                        "/admin/comidas/"
                                    ))
                                    ? "bg-white text-primary"
                                    : "text-neutral-400"
                            }`}
                        >
                            <span className="hidden md:inline lg:hidden">
                                {link.text.charAt(0)}
                            </span>
                            <span className="md:hidden lg:inline">
                                {link.text}
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>

            <Link
                href="/"
                className="hidden md:flex justify-center items-center gap-4 md:p-6"
            >
                <Image
                    src="/exit.svg"
                    alt="exit icon"
                    width={30}
                    height={30}
                />
                <h1 className="text-2xl text-white md:hidden lg:inline">
                    Exit
                </h1>
            </Link>
        </div>
    );
}
