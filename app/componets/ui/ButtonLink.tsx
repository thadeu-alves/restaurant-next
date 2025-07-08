import Link from "next/link";

export function ButtonLink({
    children,
    color,
    to,
}: {
    children: React.ReactNode;
    color: string;
    to?: string;
}) {
    return (
        <Link href={to || "/"}>
            <div
                className={`${color} w-full text-center py-2 rounded text-white mx-auto `}
            >
                <h1 className="font-semibold ">
                    {children}
                </h1>
            </div>
        </Link>
    );
}
