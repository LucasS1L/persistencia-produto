import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";
import RedisCache from "../../../shared/cache/RedisCache";
import {PRODUCT_LIST_KEY} from "../config/productListKey";

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

        let imgFileExists;
        let imgFilePath;
        try {
            await this.produtoRepository.delete(produto);

            if (produto.imagem) {
                imgFilePath = path.join(uploadConfig.directory, produto.imagem);
                imgFileExists = await fs.promises.stat(imgFilePath);
            }
        } catch (error) {
            if ((error as DBError).code === "ENOENT") {
                console.log("Erro ao recuperar arquivo: " + error);
            } else {
                throw error;
            }
        }

        if (imgFileExists) {
            await fs.promises.unlink(imgFilePath!);
        }
    }
}

export default DeleteProdutoService;