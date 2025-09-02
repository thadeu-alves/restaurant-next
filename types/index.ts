export interface Category {
    id: number;
    name: string;
    foods?: IFood[];
}

export interface IFood {
    id: number;
    title: string;
    price: number;
    urlImg: string;
    categoryId: number;
    category?: Category;
    quantity?: number;
}

export interface Evento {
    id: number;
    date: Date;
    description: string | null;
}
