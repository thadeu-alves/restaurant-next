export function FoodList({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ul className="space-y-4 grid grid-cols-1 grid-rows-1fr gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {children}
        </ul>
    );
}
