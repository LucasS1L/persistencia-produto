import {useEffect, useState} from "react";
import {Form, Input, Button, message, Spin} from "antd";
import {ProductVariantToEdit} from "../../../types/models.ts";
import {getProductVariantDetails, updateProductVariant} from "../../../api/services/productVariantService.ts";
import {useNavigate, useParams} from "react-router-dom";
import PageContainer from "../../../Components/PageContainer/PageConteiner.tsx";
import { Header} from "../../../Style/styles.ts"
import {ROUTES} from "../../../Router/ROUTES.ts";

export default function EditProductVariant() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<ProductVariantToEdit | null>(null);
    const navigate = useNavigate();

    const {id, variantId} = useParams<{ id: string; variantId: string }>();
    const productId = Number(id);
    const variantIdNumber = Number(variantId);

    useEffect(() => {
        const fetchVariantData = async () => {
            setLoading(true);
            try {
                const variant = await getProductVariantDetails!(productId, variantIdNumber);

                setInitialData(variant);
                form.setFieldsValue({
                    tamanho: variant.tamanho,
                    preco: variant.preco,
                });

            } catch (error: any) {
                message.error("Erro ao carregar os dados da variação.", error.message || "Erro desconhecido.");
            } finally {
                setLoading(false);
            }
        };

        fetchVariantData();
    }, [productId, variantIdNumber, form]);

    const onFinish = async (values: ProductVariantToEdit) => {
        setLoading(true);
        try {
            const updatedData: ProductVariantToEdit = {};

            if (values.tamanho !== initialData?.tamanho) updatedData.tamanho = values.tamanho;
            if (values.preco !== initialData?.preco) updatedData.preco = values.preco;

            if (Object.keys(updatedData).length > 0) {
                await updateProductVariant(variantIdNumber, updatedData);
                message.success("Variação de produto atualizada com sucesso!");
            } else {
                message.info("Nenhuma alteração detectada.");
            }
            navigate(ROUTES.showProducts);
        } catch (error: any) {
            message.error("Erro ao atualizar a variação: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (!initialData) {
        return (
            <PageContainer>
                <Spin spinning={true} tip="Carregando dados da variação..."/>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Header>
                <h2>Editar Variação de Produto</h2>
            </Header>
            <Spin spinning={loading} tip="Enviando dados...">
                <Form
                    form={form}
                    layout="vertical"
                    style={{
                        width: "40vw",
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tamanho"
                        name="tamanho"
                        rules={[{required: true, message: "Informe o tamanho da variação."}]}
                    >
                        <Input placeholder="Tamanho da Variação"/>
                    </Form.Item>

                    <Form.Item
                        label="Preço"
                        name="preco"
                        rules={[{required: true, message: "Informe o preço da variação."}]}
                    >
                        <Input
                            type="number"
                            placeholder="Preço da Variação"
                            min={0}
                            step="0.01"
                            prefix="R$"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                            Atualizar Variação
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </PageContainer>
    );
}
