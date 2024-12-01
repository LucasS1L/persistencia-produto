


export interface Product{
    nome: string;
    descricao: string;
    tamanho: string;
    preco: number;
}
export interface ProductForm{
    nome: string;
    descricao: string;
    tamanho: string;
    preco: string;
}

export interface ProductVariation {
    id: number;
    tamanho: string;
    preco: number;
}
export interface ProductResponse{
    id: number;
    nome: string;
    descricao: string;
    imagem?: string;
    variacoes: ProductVariation[];
}

export interface ProductVariantCreate {
    produtoId: number;
    tamanho:string;
    preco: number;
}

export interface ProductVariantToEdit {
    tamanho?:string;
    preco?: number;
}

