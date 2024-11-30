import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../typeorm/repositories/ProdutoVariacaoRepository";
import {IProdutoVariacaoRepository} from "../repositories/IProdutoVariacaoRepository";
import AppError from "../../../shared/errors/AppError";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class DeleteProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: IProdutoVariacaoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute(id: number): Promise<void> {
        const variacao = await this.produtoVariacaoRepository.findById(id);

        if (!variacao) {
            throw new AppError("Variação não encontrada.", 422);
        }

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        await this.produtoVariacaoRepository.delete(variacao);
    }
}

export default DeleteProdutoVariacaoService;