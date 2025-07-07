import Image from "next/image";

export interface FoodProps {
    titulo: string;
    preco: string;
    categoriaId: string;
    urlImg: string;
}

export function Food({ titulo, preco }: FoodProps) {
    return (
        <li className="space-y-4 p-4 w-full h-full rounded-2xl overflow-hidden shadow-lg flex flex-col border border-gray-200">
            <Image
                alt="back icon"
                src="/food.png"
                width={100}
                height={100}
                className="object-cover w-30 h-30 rounded-full"
            />
            <div className="flex flex-1 flex-col justify-between">
                <h1 className="font-semibold text-xl">
                    {titulo}
                </h1>
                <h2 className="text-amber-400 font-semibold text-2xl">
                    R$
                    {preco}
                </h2>
            </div>
        </li>
    );
}
