import Produto from "../typeorm/entities/Produto";

export default function produtoResponseDTO(produto: Produto) {
    return {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        ...(produto.imagem && {imagem: "/api/v1/produtos/" + produto.id + "/imagem"}),
        variacoes: produto.produtoVariacao.map(variacao => ({
            id: variacao.id,
            tamanho: variacao.tamanho,
            preco: variacao.preco,
        })),
    };
}