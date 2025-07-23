export interface Category {
    id: number;
    name: string;
    foods?: Food[]; // Opcional porque é um relacionamento
}

export interface Food {
    id: number;
    title: string;
    price: number;
    urlImg: string;
    categoryId: number;
    category?: Category;
}

export interface Evento {
    id: number;
    date: Date;
    description: string | null;
}
