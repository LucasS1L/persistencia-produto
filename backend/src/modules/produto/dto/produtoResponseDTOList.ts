import Produto from "../typeorm/entities/Produto";
import produtoResponseDTO from "./produtoResponseDTO";

export default function produtoResponseDTOList(produtos: Produto[]) {
    return produtos.map(produto => produtoResponseDTO(produto));
}