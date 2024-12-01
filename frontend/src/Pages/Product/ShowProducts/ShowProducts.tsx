import { useFetchProducts } from "../../../Hooks/product/useFetchProducts.ts";
import PageContainer from "../../../Components/PageContainer/PageConteiner";
import { Header} from "../../../Style/styles.ts"
import ProductCard from "../../../Components/ProductCard/ProductCard.tsx";
import { Spin } from "antd";
import { useState } from "react";

export default function ShowProducts() {
    const [refreshData, setRefreshData] = useState(false);

    const { data: products, error, loading } = useFetchProducts(refreshData);

    const handleProductDeleted = () => {
        setRefreshData(!refreshData);
    };

    const handleProductVariantDeleted = () => {
        setRefreshData(!refreshData);
    };

    if (loading) return <Spin tip="Carregando produtos..." />;
    if (error) return <p>Erro ao carregar produtos: {error.message}</p>;

    return (
        <PageContainer>
            <Header>
                <h2>Lista de Produtos</h2>
            </Header>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "center",
                    width: "80%",
                    height: "80%",
                    margin: "20px",
                }}
            >
                {products &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductDeleted={handleProductDeleted}
                            onProductVariantDeleted ={handleProductVariantDeleted}
                        />
                    ))}
            </div>
        </PageContainer>
    );
}
