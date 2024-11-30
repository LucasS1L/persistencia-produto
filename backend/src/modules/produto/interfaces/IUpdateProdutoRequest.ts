export interface IUpdateProdutoRequest {
    id: number;
    nome: string;
    descricao: string;
    subcategoriaId: number;
    disponivel: boolean;
}