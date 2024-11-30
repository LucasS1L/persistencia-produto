import AppError from "../../../shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../typeorm/repositories/ProdutoVariacaoRepository";
import {IProdutoVariacaoRepository} from "../repositories/IProdutoVariacaoRepository";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import {IAddProdutoVariacaoRequest} from "../interfaces/IAddProdutoVariacaoRequest";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class AddProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: IProdutoVariacaoRepository,
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute({produtoId, tamanho, preco}: IAddProdutoVariacaoRequest): Promise<void> {
        const produto = await this.produtoRepository.findById(produtoId);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        const variacaoExists = await this.produtoVariacaoRepository.findDuplicated(tamanho, produto.id);
        if (variacaoExists) {
            throw new AppError("Variação já existente.", 422);
        }

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        await this.produtoVariacaoRepository.add({produto, tamanho, preco});
    }

}

export default AddProdutoVariacaoService;