import {create, update, deleteResource} from "../api.ts";
import {ProductVariantCreate, ProductVariantToEdit, ProductVariation} from "../../types/models.ts";
import {getProductDetails} from "./productService.ts";


const productVariantsEndpoint: string = "/produtos/variacoes";

export async function createProductVariant(variantData: ProductVariantCreate): Promise<void> {
    try {
        await create(variantData, productVariantsEndpoint);
    } catch (error) {
        console.error("Erro ao cadastrar variação de produto:", error);
        throw error;
    }
}

export async function updateProductVariant(id:number, variantData: ProductVariantToEdit): Promise<void> {
    try {
        await update(id, variantData, productVariantsEndpoint);
    } catch (error) {
        console.error("Erro ao editar a variação de produto:", error);
        throw error;
    }
}




export async function getProductVariantDetails(productId: number, variantId: number): Promise<ProductVariation> {
    try {
        const productDetails = await getProductDetails(productId);
        return productDetails.variacoes.find((v: ProductVariation) => v.id === variantId)!;
    } catch (error) {
        console.error("Erro ao buscar os detalhes da variação de produto:", error);
        throw error;
    }
}

export async function deleteProductVariant(id: number): Promise<void> {
    try{
        await deleteResource(id, productVariantsEndpoint);
    }catch(error){
        console.error("Erro ao deletar a produto:", error);
        throw error;
    }
}

