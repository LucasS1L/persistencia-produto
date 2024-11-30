import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateProdutoService from "../services/CreateProdutoService";
import ListProdutoService from "../services/ListProdutoService";
import UpdateProdutoService from "../services/UpdateProdutoService";
import ShowProdutoService from "../services/ShowProdutoService";
import produtoResponseDTO from "../dto/produtoResponseDTO";
import produtoResponseDTOList from "../dto/produtoResponseDTOList";
import UpdateImagemProdutoService from "../services/UpdateImagemProdutoService";
import DeleteProdutoService from "../services/DeleteProdutoService";

export default class ProdutoController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listProduto = container.resolve(ListProdutoService);
        const produtos = await listProduto.execute();
        return response.json(produtoResponseDTOList(produtos));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const showProduto = container.resolve(ShowProdutoService);
        const produto = await showProduto.execute(Number(id));
        return response.json(produtoResponseDTO(produto));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {nome, descricao, subcategoriaId, tamanho, preco} = request.body;
        const createProduto = container.resolve(CreateProdutoService);
        const id = await createProduto.execute({
            nome, descricao, subcategoriaId, tamanho, preco
        });
        return response.json({id});
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {nome, descricao, subcategoriaId, disponivel} = request.body;

        const updateProduto = container.resolve(UpdateProdutoService);
        await updateProduto.execute({
            id: Number(id), nome, descricao, subcategoriaId, disponivel
        });
        return response.status(204).send();
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteProduto = container.resolve(DeleteProdutoService);
        await deleteProduto.execute(Number(id));
        return response.status(204).send();
    }

    public async updateImagem(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const updateImagem = container.resolve(UpdateImagemProdutoService);
        await updateImagem.execute(Number(id), request.file?.filename as string);
        return response.status(204).send();
    }
}