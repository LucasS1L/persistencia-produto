import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import {IProdutoRepository} from "../repositories/IProdutoRepository";
import Produto from "../typeorm/entities/Produto";
import AppError from "../../../shared/errors/AppError";

@injectable()
class ShowProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: IProdutoRepository
    ) {
    }

    public async execute(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 404);
        }

        return produto;
    }
}

export default ShowProdutoService;