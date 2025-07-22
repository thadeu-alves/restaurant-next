import React from "react";

export const Table = {
    Container: TableContainer,
    Head: TableHead,
    HeadElement: TableHeadElement,
    Body: TableBody,
    BodyElement: TableBodyElement,
};

function TableContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                {children}
            </table>
        </div>
    );
}

function TableHead({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <thead className="text-xs text-white uppercase bg-[var(--primary)]">
            <tr>{children}</tr>
        </thead>
    );
}

function TableBody({
    children,
}: {
    children: React.ReactNode;
}) {
    return <tbody>{children}</tbody>;
}

function TableHeadElement({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <th
            scope="col"
            className={`px-6 py-3 ${
                onClick
                    ? "flex justify-center items-center gap-4 cursor-pointer"
                    : ""
            }`}
            onClick={onClick}
        >
            {children}
        </th>
    );
}

function TableBodyElement({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
            {children}
        </tr>
    );
}
