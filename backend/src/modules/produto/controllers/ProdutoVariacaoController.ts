import {Request, Response} from "express";
import {container} from "tsyringe";
import AddProdutoVariacaoService from "../services/AddProdutoVariacaoService";
import UpdateProdutoVariacaoService from "../services/UpdateProdutoVariacaoService";
import DeleteProdutoVariacaoService from "../services/DeleteProdutoVariacaoService";

export default class ProdutoVariacaoController {

    public async add(request: Request, response: Response): Promise<Response> {
        const {produtoId, tamanho, preco} = request.body;
        const createProdutoVariacao = container.resolve(AddProdutoVariacaoService);
        await createProdutoVariacao.execute({produtoId, tamanho, preco});
        return response.status(201).send();
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {tamanho, preco} = request.body;
        const updateProdutoVariacao = container.resolve(UpdateProdutoVariacaoService);
        await updateProdutoVariacao.execute({
            id: Number(id), tamanho, preco
        });
        return response.status(204).send();
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteProdutoVariacao = container.resolve(DeleteProdutoVariacaoService);
        await deleteProdutoVariacao.execute(Number(id));
        return response.status(204).send();
    }

}