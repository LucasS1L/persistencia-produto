import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";
import S3StorageProvider from "../../../shared/s3/S3StorageProvider";

@injectable()
class DeleteProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute(id: number): Promise<void> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);

        await this.produtoRepository.delete(produto);

        if (produto.imagem) {
            const s3StorageProvider = new S3StorageProvider();
            await s3StorageProvider.deleteFile(produto.imagem);
        }
    }
}

export default DeleteProdutoService;