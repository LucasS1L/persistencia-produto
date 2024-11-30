import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import {IProdutoVariacaoRepository} from "../repositories/IProdutoVariacaoRepository";
import {ProdutoVariacaoRepository} from "../typeorm/repositories/ProdutoVariacaoRepository";
import {ICreateProdutoRequest} from "../interfaces/ICreateProdutoRequest";
import AppError from "../../../shared/errors/AppError";
import {Transactional} from "typeorm-transactional";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class CreateProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: IProdutoVariacaoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    @Transactional()
    public async execute({
                             nome, descricao, tamanho, preco
                         }: ICreateProdutoRequest): Promise<number> {

        const produtoExists = await this.produtoRepository.findByNome(nome);

        if (produtoExists) {
            throw new AppError("Já existe um produto com esse nome.", 422);
        }

        const produto = await this.produtoRepository.create({
            nome, descricao
        });

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        await this.produtoVariacaoRepository.add({produto, tamanho, preco});

        return produto.id;
    }

}

export default CreateProdutoService;