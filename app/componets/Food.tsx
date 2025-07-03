import Image from "next/image";

export interface FoodProps {
    titulo: string;
    preco: string;
    categoriaId: string;
    urlImg: string;
}

export function Food({ titulo, preco }: FoodProps) {
    return (
        <li className="border-2 border-black rounded-2xl flex justify-between items-center pr-4 overflow-hidden shadow-md">
            <Image
                alt="back icon"
                src="/food.png"
                width={50}
                height={50}
                className="object-cover w-25 h-20"
            />
            <h1 className="font-semibold text-xl">
                {titulo}{" "}
            </h1>
            <h1 className="text-amber-400 font-semibold text-2xl">
                R$
                {preco}
            </h1>
        </li>
    );
}
