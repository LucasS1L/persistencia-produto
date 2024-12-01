import { Product, ProductResponse } from "../../types/models.ts";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    timeout: 10000,
});


const urlProducts: string = "/produtos";
const urlProductImage = (id: number) => `/produtos/${id}/imagem`;

export async function createProduct(productData: Product, imageFile: File | null): Promise<void> {
    try {
        await api.post(urlProducts, productData);

        const allProductsResponse = await api.get<ProductResponse[]>(urlProducts);
        const products = (allProductsResponse.data).sort((a, b) => a.id - b.id);

        const lastProduct = products[products.length - 1];
        const productId = lastProduct?.id;

        if (productId && imageFile) {
            const formData = new FormData();
            formData.append("imagem", imageFile);

            await api.patch(`${urlProducts}/${productId}/imagem`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        throw error;
    }
}

export async function getProducts(): Promise<ProductResponse[]> {
    try {
        const productsResponse = await api.get<ProductResponse[]>(urlProducts);
        const products = productsResponse.data;

        return await Promise.all(
            products.map(async (product) => {
                try {
                    const imageResponse = await api.get(urlProductImage(product.id), { responseType: 'blob' });
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    return { ...product, imagem: imageUrl };
                } catch (error) {
                    console.error(`Erro ao buscar a imagem para o produto ${product.id}:`, error);
                    return product;
                }
            })
        );
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
}

export async function getProductDetails(id: number): Promise<ProductResponse> {
    try {
        const productResponse = await api.get<ProductResponse>(`${urlProducts}/${id}`);
        const product = productResponse.data;

        try {
            const imageResponse = await api.get(urlProductImage(product.id), { responseType: "blob" });
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...product, imagem: imageUrl };
        } catch (imageError) {
            console.error(`Erro ao buscar a imagem do produto ${id}:`, imageError);
            return product;
        }
    } catch (error) {
        console.error(`Erro ao buscar detalhes do produto ${id}:`, error);
        throw error;
    }
}

export async function updateProduct(
    id: number,
    updatedData: Partial<Product>,
    imageFile: File | null
): Promise<void> {
    try {
        if (Object.keys(updatedData).length > 0) {
            await api.patch(`${urlProducts}/${id}`, updatedData);
        }

        if (imageFile) {
            const formData = new FormData();
            formData.append("imagem", imageFile);

            await api.patch(`${urlProducts}/${id}/imagem`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }

    } catch (error) {
        console.error(`Erro ao atualizar o produto ${id}:`, error);
        throw error;
    }
}

export async function deleteProduct(id: number): Promise<void> {
    try {
        await api.delete(`${urlProducts}/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar o produto ${id}:`, error);
        throw error;
    }
}


