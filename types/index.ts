export interface Category {
    id: number;
    name: string;
    foods?: IFood[];
    urlImg?: string;
}

export interface IFood {
    id: number;
    title: string;
    price: number;
    urlImg: string;
    categoryId: number;
    description?: string;
    category?: Category;
    quantity?: number;
}
