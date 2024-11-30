import {inject, injectable} from "tsyringe";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import Produto from "../typeorm/entities/Produto";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

@injectable()
class ListProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute(): Promise<Produto[]> {
        let produtos = await this.redisCache.recover<Produto[]>(PRODUCT_LIST_KEY);
        if (!produtos) {
            produtos = await this.produtoRepository.findAll();
            await this.redisCache.save(PRODUCT_LIST_KEY, produtos);
        }
        return produtos;
    }
}

export default ListProdutoService;