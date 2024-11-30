import Produto from "../typeorm/entities/Produto";
import {ICreateProduto} from "../interfaces/ICreateProduto";

export interface IProdutoRepository {
    findAll(): Promise<Produto[]>;
    findById(id: number): Promise<Produto | null>;
    findByNome(nome: string): Promise<Produto | null>;
    create(data: ICreateProduto): Promise<Produto>;
    update(produto: Produto): Promise<void>;
    delete(produto: Produto): Promise<void>;
}