"use client";
import "./globals.css";
import { Header } from "./componets/Header";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { AdminHeader } from "./componets/AdminHeader";

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    if (pathname.includes("/admin")) {
        console.log("Rendering AdminLayout");
        return (
            <html lang="en" className={inter.className}>
                <head>
                    <title>Admin Page</title>
                </head>
                <body className="antialiased md:min-h-screen md:max-h-screen md:overflow-hidden md:flex">
                    <AdminHeader />
                    {children}
                </body>
            </html>
        );
    }

    return (
        <html lang="en" className={inter.className}>
            <head>
                <title>Restaurant</title>
            </head>
            <body
                className={`antialiased min-h-screen flex flex-col `}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
