import { useState } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";
import PageContainer from "../../../Components/PageContainer/PageConteiner.tsx";
import { FormContainer } from "../../../Components/FormContainer/FormContainer.ts";
import { Header} from "../../../Style/styles.ts"
import { useFetchProducts } from "../../../Hooks/product/useFetchProducts.ts";
import { createProductVariant } from "../../../api/services/productVariantService.ts";
import {ProductVariantCreate} from "../../../types/models.ts";

export default function CreateProductVariant() {
    const [loading, setLoading] = useState<boolean>(false);

    const { data: products, loading: loadingProducts } = useFetchProducts(true);

    const onFinish = async (values: { produtoId: number; tamanho: string; preco: string }) => {
        const precoConvertido = parseFloat(values.preco.replace(",", "."));
        if (isNaN(precoConvertido)) {
            message.error("Por favor, insira um preço válido.");
            return;
        }

        const variationData:ProductVariantCreate = {
            produtoId: values.produtoId,
            tamanho: values.tamanho,
            preco: precoConvertido,
        };

        setLoading(true);
        try {
            await createProductVariant(variationData);
            message.success("Variação cadastrada com sucesso!");
        } catch (error: any) {
            message.error("Erro ao cadastrar variação: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <Header><h2>Cadastro de Variação de Produto</h2></Header>
            <Spin spinning={loading || loadingProducts} tip="Carregando...">
                <FormContainer style={{ height: "85vh" }}>
                    <Form
                        layout="vertical"
                        style={{
                            width: "40vw",
                            height: "80vh",
                            marginTop: "20px",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Produto"
                            name="produtoId"
                            rules={[{ required: true, message: "Por favor, selecione o produto" }]}>
                            <Select
                                placeholder="Selecione o Produto"
                                loading={loadingProducts}
                            >
                                {products?.map((product) => (
                                    <Select.Option key={product.id} value={product.id}>
                                        {product.nome}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Tamanho"
                            name="tamanho"
                            rules={[{ required: true, message: "Por favor, insira o tamanho da variação" }]}>
                            <Input placeholder="Ex: Pequeno, Médio, Grande" />
                        </Form.Item>

                        <Form.Item
                            label="Preço"
                            name="preco"
                            rules={[{ required: true, message: "Por favor, insira o preço da variação" }]}>
                            <Input
                                style={{ width: "100%" }}
                                prefix="R$"
                                onKeyPress={(event) => {
                                    const charCode = event.charCode;
                                    if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Cadastrar Variação
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContainer>
            </Spin>
        </PageContainer>
    );
}
