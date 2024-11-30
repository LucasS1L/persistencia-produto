import path from "path";
import fs from "fs";
import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import uploadConfig from "../../../config/upload";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

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

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        if (!produto.imagem) {
            await this.redisCache.invalidate(PRODUCT_LIST_KEY);
        }

        if (produto.imagem) {
            const imgFilePath = path.join(uploadConfig.directory, produto.imagem);

            let imgFileExists;

            try {
                imgFileExists = await fs.promises.stat(imgFilePath);
            } catch (error) {
                console.log("Erro ao recuperar arquivo:" + error);
            }

            if (imgFileExists) {
                await fs.promises.unlink(imgFilePath);
            }

        }
        produto.imagem = imgFilename;
        await this.produtoRepository.update(produto);
    }
}

export default UpdateImagemProdutoService;