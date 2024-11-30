import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import {IUpdateProdutoRequest} from "../interfaces/IUpdateProdutoRequest";
import AppError from "../../../shared/errors/AppError";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class UpdateProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute({id, nome, descricao, subcategoriaId, disponivel}: IUpdateProdutoRequest): Promise<void> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }


        if (nome) {
            const produtoExists = await this.produtoRepository.findByNome(nome);
            if (produtoExists && produtoExists.id !== produto.id) {
                throw new AppError("Já existe um produto com esse nome.", 422);
            }
            produto.nome = nome;
        }

        if (descricao) produto.descricao = descricao;
        await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        await this.produtoRepository.update(produto);
    }
}

export default UpdateProdutoService;