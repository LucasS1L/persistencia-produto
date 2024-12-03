import { useState } from "react";
import { Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PageContainer from "../../../Components/PageContainer/PageConteiner.tsx";
import { Header} from "../../../Style/styles.ts"
import { createProduct } from "../../../api/services/productService.ts";
import { RcFile } from "antd/lib/upload";
import {ProductForm} from "../../../types/models.ts";
import { FormContainer } from "../../../Components/FormContainer/FormContainer.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../Router/ROUTES.ts";

export default function CreateProduct() {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const navigate = useNavigate();

    const handleImageUpload = (file: RcFile) => {
        setImageFile(file);
        return false;
    };

    const onFinish = async (values: ProductForm) => {
        if (!imageFile) {
            message.error("Por favor, faça o upload de uma imagem.");
            return;
        }

        const precoConvertido = parseFloat(values.preco.replace(",", "."));
        if (isNaN(precoConvertido)) {
            message.error("Por favor, insira um preço válido.");
            return;
        }

        const productData = {
            nome: values.nome,
            descricao: values.descricao,
            tamanho: values.tamanho,
            preco: precoConvertido,
        };

        setLoading(true);
        try {
            await createProduct(productData, imageFile);
            message.success("Produto cadastrado com sucesso!");
            setImageFile(null);
            navigate(ROUTES.showProducts);

        } catch (error: any) {
            message.error("Erro ao cadastrar produto: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <Header><h2>Cadastro de Produto</h2></Header>
            <Spin spinning={loading} tip="Enviando dados...">
                <FormContainer style={{ height: "85vh" }}>
                    <Form
                        layout="vertical"
                        style={{
                            width: "40vw",
                            height: "50em",
                            marginTop: "20px",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",

                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Por favor, insira o nome do produto" }]}>
                            <Input placeholder="Nome do Produto" />
                        </Form.Item>

                        <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: "Por favor, insira a descrição do produto" }]}>
                            <Input.TextArea placeholder="Descrição do Produto" rows={4} />
                        </Form.Item>



                        <Form.Item label="Tamanho" name="tamanho" rules={[{ required: true, message: "Por favor, insira o tamanho do produto" }]}>
                            <Input placeholder="Ex: Médio, Grande, etc." />
                        </Form.Item>

                        <Form.Item label="Preço" name="preco" rules={[{ required: true, message: "Por favor, insira o preço do produto" }]}>
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

                        <Form.Item label="Imagem do Produto" name="imagem" valuePropName="file">
                            <Upload
                                name="imagem"
                                beforeUpload={handleImageUpload}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Clique para fazer upload</Button>
                            </Upload>
                            {imageFile && <p style={{ marginTop: "10px" }}>Arquivo selecionado: {imageFile.name}</p>}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Cadastrar Produto
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContainer>
            </Spin>
        </PageContainer>
    );
}
