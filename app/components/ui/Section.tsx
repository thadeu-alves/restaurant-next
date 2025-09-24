export const Section = {
    Container: PageContainer,
    Header: PageHeader,
    Title: PageTitleH1,
    Sub: PageTitleH2,
};

function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-12 space-y-6 container mx-auto lg:space-y-12">
            {children}
        </div>
    );
}

function PageHeader({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2 text-center lg:space-y-4">
            {children}
        </div>
    );
}

function PageTitleH1({
    children,
    invert,
}: {
    children: React.ReactNode;
    invert: boolean;
}) {
    return (
        <h1
            className={`text-3xl font-bold lg:text-4xl ${
                invert ? "text-white" : "text-primary"
            }`}
        >
            {children}
        </h1>
    );
}

function PageTitleH2({
    children,
    invert,
    className,
}: {
    children: React.ReactNode;
    invert: boolean;
    className?: string;
}) {
    return (
        <h2
            className={`lg:text-xl ${
                invert ? "text-white" : "text-primary"
            } font-light ${className}`}
        >
            {children}
        </h2>
    );
}
