import { useState } from "react";
import { Button, Card, Collapse, Image, Typography, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../api/services/productService.ts";
import {deleteProductVariant} from "../../api/services/productVariantService.ts";

const { Meta } = Card;
const { Panel } = Collapse;
const { Text } = Typography;

export default function ProductCard({ product, onProductDeleted, onProductVariantDeleted }: any) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: `Tem certeza que deseja excluir o produto "${product.nome}"?`,
            okText: "Sim, excluir",
            cancelText: "Cancelar",
            onOk: async () => {
                try {
                    setLoading(true);
                    await deleteProduct(product.id);
                    message.success("Produto excluído com sucesso!");
                    onProductDeleted(product.id);
                } catch (error:any) {
                    console.error("Erro ao excluir produto:", error);
                    message.error("Erro ao excluir o produto.", error.response?.data?.message);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const handleVariationDelete = async (variacaoId: number) => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content: `Tem certeza que deseja excluir esta variação?`,
            okText: "Sim, excluir",
            cancelText: "Cancelar",
            onOk: async () => {
                try {
                    setLoading(true);
                    await deleteProductVariant(variacaoId);
                    message.success("Variação excluída com sucesso!", variacaoId);
                    onProductVariantDeleted(variacaoId);
                } catch (error:any) {
                    console.error("Erro ao excluir variação:", error);
                    message.error("Erro ao excluir a variação.", error.response?.data?.message);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    return (
        <Card
            hoverable
            style={{ width: 300, borderRadius: 8 }}
            cover={
                product.imagem ? (
                    <Image
                        src={product.imagem}
                        alt={product.nome}
                        style={{ width: "100%", height: 200, objectFit: "cover" }}
                    />
                ) : null
            }
        >
            <Meta title={product.nome} description={product.descricao} />
            <br />

            <Button type="link" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Ver menos" : "Ver mais"}
            </Button>

            {expanded && (
                <Collapse>
                    <Panel header="Variações" key="1" style={{ maxHeight: "20vh", overflow: "auto" }}>
                        {product.variacoes.map((variacao: any) => (
                            <div key={variacao.id} style={{ marginBottom: "8px" }}>
                                <Text strong>Tamanho:</Text> <Text>{variacao.tamanho}</Text>
                                <br />
                                <Text strong>Preço:</Text>
                                <Text>
                                    {variacao.preco
                                        ? `R$ ${parseFloat(variacao.preco).toFixed(2)}`
                                        : "Preço indisponível"}
                                </Text>
                                <br />

                                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                                    <Link to={`/editProductVariant/${product.id}/${variacao.id}`}>
                                        <Button type="primary" size="small">
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="default"
                                        danger
                                        size="small"
                                        onClick={() => handleVariationDelete(variacao.id)}
                                        loading={loading}
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Panel>
                </Collapse>
            )}

            <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                <Link to={`/editProducts/${product.id}`}>
                    <Button type="primary">Editar</Button>
                </Link>
                <Button
                    type="default"
                    danger
                    onClick={handleDelete}
                    loading={loading}
                >
                    Excluir
                </Button>
            </div>
        </Card>
    );
}
