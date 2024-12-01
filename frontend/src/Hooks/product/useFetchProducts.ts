import { useState, useEffect } from "react";
import { ProductResponse } from "../../types/models.ts";
import { getProducts } from "../../api/services/productService.ts";



export const useFetchProducts = ( refreshData: boolean) => {
    const [data, setData] = useState<ProductResponse[]>();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                    const products = await getProducts();
                    setData(products);

            } catch (e) {
                setError(e instanceof Error ? e : new Error("Erro desconhecido"));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshData]);

    return { data, error, loading };
};
