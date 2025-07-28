import Image from "next/image";
import { Table } from "../components/ui/Table";

export default function page() {
    const foods = [
        {
            name: "Employee Name",
            title: "Food",
            category: "Category",
            price: 99.99,
            range: 8,
        },
        {
            name: "Employee Name",
            title: "Food",
            category: "Category",
            price: 99.99,
            range: 2,
        },
        {
            name: "Employee Name",
            title: "Food",
            category: "Category",
            price: 99.99,
            range: 5,
        },
        {
            name: "Employee Name",
            title: "Food",
            category: "Category",
            price: 99.99,
            range: 1,
        },
        {
            name: "Employee Name",
            title: "Food",
            category: "Category",
            price: 99.99,
            range: 9,
        },
    ];

    return (
        <div className="p-12 flex flex-col gap-4 h-screen w-screen">
            <div className="flex gap-6">
                <div className="bg-green-500 p-8 rounded-2xl text-white text-center shadow">
                    <p className="text-xl font-medium">
                        Income
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
                <div className="bg-red-500 p-8 rounded-2xl text-white text-center shadow">
                    <p className="text-xl font-medium">
                        Expense
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl text-primary text-center shadow border border-gray-100">
                    <p className="text-xl font-medium">
                        Balance
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
            </div>
            <div className="">
                <Table.Container>
                    <Table.Head>
                        <Table.HeadElement>
                            Employee
                        </Table.HeadElement>
                        <Table.HeadElement>
                            Major Food
                        </Table.HeadElement>
                        <Table.HeadElement>
                            Category
                        </Table.HeadElement>
                        <Table.HeadElement>
                            Price
                        </Table.HeadElement>
                        <Table.HeadElement>
                            Acception
                        </Table.HeadElement>
                        <Table.HeadElement>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadElement>
                    </Table.Head>
                    <Table.Body>
                        {foods.map((food, id) => {
                            return (
                                <Table.BodyElement key={id}>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src="/profile.jpg"
                                                alt="profile employee image"
                                                width={30}
                                                height={30}
                                                className="rounded-full w-12 h-12"
                                            />
                                            {food.name}
                                        </div>
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {food.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {food.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        R$ {food.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-full h-3 rounded bg-gray-300 overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{
                                                    width: `${
                                                        food.range *
                                                        10
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </span>
                                    </td>
                                </Table.BodyElement>
                            );
                        })}
                    </Table.Body>
                </Table.Container>
            </div>
            <div>
                <div>Food</div>
            </div>
        </div>
    );
}
