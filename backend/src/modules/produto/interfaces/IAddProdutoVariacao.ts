import Produto from "../typeorm/entities/Produto";

export interface IAddProdutoVariacao {
    produto: Produto;
    tamanho: string;
    preco: number;
}