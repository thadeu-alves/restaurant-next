import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./componets/Header";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Restaurant",
    description: "Developed by Thadeu Alves",
};

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
            <body
                className={`antialiased min-h-screen flex flex-col `}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
