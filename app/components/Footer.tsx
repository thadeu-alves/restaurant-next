"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const path = usePathname();
    console.log(path);

    const links = [
        {
            href: "/",
            title: "Homepage",
        },
        {
            href: "/menu",
            title: "Menu",
        },
        {
            href: "/cart",
            title: "Cart",
        },
    ];

    return (
        <div className={`bg-primary`}>
            <nav
                className={`bg-primary space-y-8 px-12 py-8 container mx-auto md:flex md:justify-between lg:py-8`}
            >
                <div>
                    <Link href="/">
                        <h1
                            className={`text-4xl font-black text-[var(--secondary)]`}
                        >
                            LOGO
                        </h1>
                    </Link>
                    <p className="text-white max-w-80 mt-6">
                        A Next.js and TypeScript web app for
                        restaurant management. Features
                        client-side menu browsing and admin
                        panel for product inventory, orders,
                        and financial control. Streamlines
                        operations in one integrated
                        platform.
                    </p>
                </div>

                <div className="flex gap-8">
                    <div className="space-y-6">
                        <h1 className="text-secondary font-semibold">
                            Site Map
                        </h1>
                        <ul>
                            {links.map((link, id) => {
                                return (
                                    <a
                                        href={link.href}
                                        key={id}
                                    >
                                        <li
                                            className={`font-light text-md text-secondary ${
                                                path ===
                                                link.href
                                                    ? "underline"
                                                    : ""
                                            }`}
                                        >
                                            {link.title}
                                        </li>
                                    </a>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-secondary font-semibold">
                            Utils
                        </h1>
                        <ul>
                            <a href="https://github.com/thadeu-alves/restaurant-next">
                                <li
                                    className={`font-light text-md text-secondary`}
                                >
                                    Github Repository
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="text-center py-4">
                <p className="text-white">
                    This website was developed by{" "}
                    <a
                        href="https://thadeualves.vercel.app"
                        className="italic text-amber-400 hover:text-amber-600"
                    >
                        Thadeu Alves
                    </a>
                </p>
            </div>
        </div>
    );
}
