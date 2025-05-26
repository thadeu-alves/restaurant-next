export interface Categoria {
    id: number;
    nome: string;
    comidas?: Comida[]; // Opcional porque é um relacionamento
}

export interface Comida {
    id: number;
    titulo: string;
    preco: string; // Como definido no schema (string para formatos como "R$ 29,90")
    urlImg: string;
    categoriaId: number;
    categoria?: Categoria; // Relacionamento opcional
}

export interface Evento {
    id: number;
    data: Date; // DateTime no Prisma vira Date no TypeScript
    descricao: string | null; // Opcional (nullable no schema)
}
