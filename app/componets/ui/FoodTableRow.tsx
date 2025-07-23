import Link from "next/link";
import { Table } from "./Table";

interface FoodTableRowProps {
    title: string;
    price: number;
    category: string;
    id: number;
}

export function FoodTableRow({
    title,
    price,
    category,
    id,
}: FoodTableRowProps) {
    return (
        <Table.BodyElement>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {title}
            </th>
            <td className="px-6 py-4">{category}</td>
            <td className="px-6 py-4">R${price}</td>
            <td className="px-6 py-4 text-right">
                <Link
                    href={`/admin/comidas/${id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Edit
                </Link>
            </td>
        </Table.BodyElement>
    );
}
