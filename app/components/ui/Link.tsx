import Link from "next/link";

export function LinkUi({
    children,
    className,
    href,
    alt,
}: {
    children: React.ReactNode;
    className?: string;
    href: string;
    alt?: string;
}) {
    return (
        <Link
            href={href}
            aria-label={alt}
            className={`bg-primary text-white font-bold w-fit h-fit px-8 py-4 rounded-full cursor-pointer text-nowrap ${className}`}
        >
            {children}
        </Link>
    );
}
