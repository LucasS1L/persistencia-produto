import {NextFunction, Request, Response} from "express";
import {ProdutoRepository} from "../typeorm/repositories/ProdutoRepository";
import AppError from "../../../shared/errors/AppError";

export default async function verificaProduto(request: Request, response: Response, next: NextFunction) {
    const produtoRepository = new ProdutoRepository();
    const {id} = request.params;

    const produto = await produtoRepository.findById(Number(id));

    if (!produto) {
        throw new AppError("Produto não encontrado.", 422);
    }

    next();
}