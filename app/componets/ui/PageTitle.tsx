export const PageTitle = {
    Title: PageTitleH1,
    Sub: PageTitleH2,
};

function PageTitleH1({
    children,
    invert,
}: {
    children: React.ReactNode;
    invert: boolean;
}) {
    return (
        <h1
            className={`text-3xl font-medium lg:text-4xl ${
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
}: {
    children: React.ReactNode;
    invert: boolean;
}) {
    return (
        <h2
            className={`lg:text-xl ${
                invert ? "text-white" : "text-primary"
            } font-light`}
        >
            {children}
        </h2>
    );
}
