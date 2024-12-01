import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PageContainer from "../../../Components/PageContainer/PageConteiner.tsx";
import { Header} from "../../../Style/styles.ts"
import { updateProduct, getProductDetails } from "../../../api/services/productService.ts";
import { ProductResponse } from "../../../types/models.ts";
import { FormContainer } from "../../../Components/FormContainer/FormContainer.ts";
import { useParams } from "react-router-dom";

export default function EditProduct() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<ProductResponse | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const product = await getProductDetails(Number(id));
                setInitialData(product);

                form.setFieldsValue({
                    nome: product.nome,
                    descricao: product.descricao,
                });
            } catch (error: any) {
                message.error("Erro ao carregar os dados do produto.", (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id, form]);

    const handleImageUpload = (file: File) => {
        setImageFile(file);
        return false;
    };

    const onFinish = async (values: Partial<ProductResponse>) => {
        const updatedData: Partial<ProductResponse> = {};
        (Object.keys(values) as (keyof ProductResponse)[]).forEach((key) => {
            if (values[key] !== initialData?.[key]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                updatedData[key] = values[key];
            }
        });

        if (Object.keys(updatedData).length === 0 && !imageFile) {
            message.info("Nenhuma alteração foi feita.");
            return;
        }

        setLoading(true);
        try {
            if (Object.keys(updatedData).length > 0) {
                await updateProduct(Number(id), updatedData, null);
                message.success("Dados do produto atualizados com sucesso!");
            }

            if (imageFile) {
                await updateProduct(Number(id), {}, imageFile);
                message.success("Imagem do produto atualizada com sucesso!");
            }
        } catch (error: any) {
            message.error("Erro ao atualizar produto: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (!initialData) {
        return (
            <PageContainer>
                <Spin spinning={true} tip="Carregando dados do produto..." />
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Header>
                <h2>Editar Produto</h2>
            </Header>
            <Spin spinning={loading} tip="Enviando dados...">
                <FormContainer style={{ height: "85vh" }}>
                    <Form
                        form={form}
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
                            label="Nome"
                            name="nome"
                            rules={[{ max: 50, message: "O nome pode ter no máximo 50 caracteres." }]}
                        >
                            <Input placeholder="Nome do Produto" />
                        </Form.Item>

                        <Form.Item
                            label="Descrição"
                            name="descricao"
                            rules={[{ max: 300, message: "A descrição pode ter no máximo 300 caracteres." }]}
                        >
                            <Input.TextArea placeholder="Descrição do Produto" rows={4} />
                        </Form.Item>

                        <Form.Item label="Imagem do Produto">
                            <Upload
                                name="imagem"
                                beforeUpload={handleImageUpload}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Alterar Imagem</Button>
                            </Upload>
                            {imageFile && <p style={{ marginTop: "10px" }}>Arquivo selecionado: {imageFile.name}</p>}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Atualizar Produto
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContainer>
            </Spin>
        </PageContainer>
    );
}
