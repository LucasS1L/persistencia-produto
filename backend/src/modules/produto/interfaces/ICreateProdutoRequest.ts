export interface ICreateProdutoRequest {
    nome: string;
    descricao: string;
    subcategoriaId: number;
    tamanho: string;
    preco: number;
}