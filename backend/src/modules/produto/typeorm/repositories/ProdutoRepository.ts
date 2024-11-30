import {IProdutoRepository} from "../../repositories/IProdutoRepository";
import {Repository} from "typeorm";
import {dataSource} from "../../../../shared/typeorm";
import Produto from "../entities/Produto";
import {ICreateProduto} from "../../interfaces/ICreateProduto";


export class ProdutoRepository implements IProdutoRepository {
    private ormRepository: Repository<Produto>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Produto);
    }

    public async findAll(): Promise<Produto[]> {
        return await this.ormRepository.find(
            {
                relations: ["produtoVariacao"],
                order: {
                    criado_em: "ASC",
                    produtoVariacao: {
                        preco: "ASC",
                    }
                }
            });
    }


    public async findById(id: number): Promise<Produto | null> {
        return await this.ormRepository.findOne({
            where: {id}, relations: ["produtoVariacao"],
            order: {
                produtoVariacao: {
                    preco: "ASC",
                }
            }
        });
    }

    public async findByNome(nome: string): Promise<Produto | null> {
        return await this.ormRepository.findOneBy({nome});
    }

    public async create({nome, descricao}: ICreateProduto): Promise<Produto> {
        const produto = this.ormRepository.create({nome, descricao});
        await this.ormRepository.save(produto);
        return produto;
    }

    public async update(produto: Produto): Promise<void> {
        await this.ormRepository.save(produto);
    }

    public async delete(produto: Produto): Promise<void> {
        await this.ormRepository.remove(produto);
    }
}
