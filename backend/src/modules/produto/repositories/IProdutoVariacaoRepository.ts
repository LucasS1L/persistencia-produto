import {IAddProdutoVariacao} from "../interfaces/IAddProdutoVariacao";
import ProdutoVariacao from "../typeorm/entities/ProdutoVariacao";

export interface IProdutoVariacaoRepository {
    findById(id: number): Promise<ProdutoVariacao | null>;
    findDuplicated(tamanho: string, produtoId: number): Promise<ProdutoVariacao | null>;
    add(data: IAddProdutoVariacao): Promise<ProdutoVariacao>;
    update(produtoVariacao: ProdutoVariacao): Promise<void>;
    delete(produto: ProdutoVariacao): Promise<void>;
}
