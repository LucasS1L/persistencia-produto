import {Repository} from "typeorm";
import {dataSource} from "../../../../shared/typeorm";
import {IProdutoVariacaoRepository} from "../../repositories/IProdutoVariacaoRepository";
import ProdutoVariacao from "../entities/ProdutoVariacao";
import {IAddProdutoVariacao} from "../../interfaces/IAddProdutoVariacao";

export class ProdutoVariacaoRepository implements IProdutoVariacaoRepository {
    private ormRepository: Repository<ProdutoVariacao>;

    constructor() {
        this.ormRepository = dataSource.getRepository(ProdutoVariacao);
    }

    public async findById(id: number): Promise<ProdutoVariacao | null> {
        return await this.ormRepository.findOne({where: {id}, relations: ["produto"]});
    }

    public async findDuplicated(tamanho: string, produtoId: number): Promise<ProdutoVariacao | null> {
        return await this.ormRepository.findOne({
            relations: ["produto"], where: {
                tamanho, produto: {
                    id: produtoId,
                },
            }
        });
    }

    public async add({produto, tamanho, preco}: IAddProdutoVariacao): Promise<ProdutoVariacao> {
        const produtoVariacao = this.ormRepository.create({produto, tamanho, preco});
        await this.ormRepository.save(produtoVariacao);
        return produtoVariacao;
    }

    public async update(produtoVariacao: ProdutoVariacao): Promise<void> {
        await this.ormRepository.save(produtoVariacao);
    }

    public async delete(produtoVariacao: ProdutoVariacao): Promise<void> {
        await this.ormRepository.remove(produtoVariacao);
    }
}
