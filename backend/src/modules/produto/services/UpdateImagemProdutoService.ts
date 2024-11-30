import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";
import S3StorageProvider from "../../../shared/s3/S3StorageProvider";

@injectable()
class UpdateImagemProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository,
        @inject(RedisCache)
        private redisCache: RedisCache,
    ) {
    }

    public async execute(id: number, imgFilename: string) {
        const produto = await this.produtoRepository.findById(id);
        const s3StorageProvider = new S3StorageProvider();

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        await this.redisCache.invalidate(PRODUCT_LIST_KEY);

        if (produto.imagem) {
            await s3StorageProvider.deleteFile(produto.imagem);
        }

        await s3StorageProvider.saveFile(imgFilename);

        produto.imagem = imgFilename;
        await this.produtoRepository.update(produto);
    }
}

export default UpdateImagemProdutoService;