"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            href: "/",
            title: "Home",
        },
        {
            href: "/cardapio",
            title: "Special Menu",
        },
    ];

    useEffect(() => {
        if (open) {
            document.body.classList.add(
                "overflow-y-hidden"
            );
        } else {
            document.body.classList.remove(
                "overflow-y-hidden"
            );
        }
    }, [open]);

    function handleSidebar() {
        console.log("click");
        setOpen(!open);
    }

    return (
        <div className={`bg-primary`}>
            <nav
                className={`flex justify-between bg-primary px-6 py-3  max-w-[1020px] mx-auto`}
            >
                <Link href="/">
                    <h1
                        className={`text-2xl font-medium text-[var(--secondary)]`}
                    >
                        Logo
                    </h1>
                </Link>
                <button
                    className={`bg-[var(--secondary)] w-fit p-2 rounded-xl lg:hidden`}
                    onClick={handleSidebar}
                >
                    <Image
                        src="/menu.svg"
                        alt="menu"
                        className="w-6"
                        width={30}
                        height={30}
                    />
                </button>

                <ul className="justify-end items-center flex-1 gap-6 hidden lg:flex">
                    {links.map((link) => {
                        return (
                            <a
                                href={link.href}
                                key={link.title}
                            >
                                <li className="font-medium text-md">
                                    {link.title}
                                </li>
                            </a>
                        );
                    })}
                </ul>

                <div
                    className={`lg:hidden fixed inset-0 w-full h-screen bg-primary border-r border-r-black z-50 transition-transform duration-300 ease-in-out transform ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >
                    <div className="p-6 flex flex-col h-full">
                        <button
                            className={`bg-[var(--secondary)] w-fit p-2 rounded-xl fixed `}
                            onClick={handleSidebar}
                        >
                            <h1 className="w-6 font-medium">
                                X
                            </h1>
                        </button>

                        <ul className="flex flex-col justify-center items-center flex-1 gap-6">
                            {links.map((link) => {
                                return (
                                    <a
                                        href={link.href}
                                        key={link.title}
                                    >
                                        <li
                                            className={`font-medium text-2xl text-[var(--secondary)]`}
                                        >
                                            {link.title}
                                        </li>
                                    </a>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
