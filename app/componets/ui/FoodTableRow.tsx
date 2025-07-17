import Link from "next/link";

interface FoodTableRowProps {
    title: string;
    price: string;
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
        <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
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
        </tr>
    );
}
