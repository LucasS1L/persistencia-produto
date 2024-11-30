import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../typeorm/repositories/ProdutoVariacaoRepository";
import {IProdutoVariacaoRepository} from "../repositories/IProdutoVariacaoRepository";
import AppError from "../../../shared/errors/AppError";
import {IUpdateProdutoVariacaoRequest} from "../interfaces/IUpdateProdutoVariacaoRequest";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class UpdateProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: IProdutoVariacaoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute({id, tamanho, preco}: IUpdateProdutoVariacaoRequest): Promise<void> {
        const variacao = await this.produtoVariacaoRepository.findById(id);

        if (!variacao) {
            throw new AppError("Variação não encontrada.", 422);
        }

        if (tamanho) {
            const variacaoExists = await this.produtoVariacaoRepository.findDuplicated(tamanho, variacao.produto.id);
            if (variacaoExists && variacaoExists.id !== variacao.id) {
                throw new AppError("Variação já existente.", 422);
            }
            variacao.tamanho = tamanho;
        }

        if (preco) variacao.preco = preco;

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        await this.produtoVariacaoRepository.update(variacao);
    }
}

export default UpdateProdutoVariacaoService;