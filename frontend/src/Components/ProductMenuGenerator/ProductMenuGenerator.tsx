import { useFetchProducts } from '../../Hooks/product/useFetchProducts.ts';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    pdf,
} from '@react-pdf/renderer';
import {Button} from "antd";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
    },
    productName: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    titleMenu: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        borderBottom: "1px solid black",
        padding:"8"
    },
    productContainer: {
        marginBottom: 25,
    },
    productContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    productImage: {
        width: 120,
        height: 120,
        border: '1px solid #000',
        marginRight: 20,
    },
    description: {
        flex: 1,
        textAlign: 'left',
    },
    variations: {
        marginTop: 10,
    },
    variationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        paddingVertical: 5,
    },
    separator: {
        marginVertical: 20,
        borderTop: '1px solid black',
    },
});

export const ProductMenuGenerator = () => {
    const { data: products, error } = useFetchProducts(true);

    const handleDownloadPDF = async () => {
        if (!products || products.length === 0) {
            alert("Nenhum produto encontrado!");
            return;
        }

        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.titleMenu}>CARDÁPIO</Text>
                    {products.map((product, index) => (
                        <View key={product.id} style={styles.productContainer}>
                            <Text style={styles.productName}>{product.nome}</Text>
                            <View style={styles.productContent}>
                                {product.imagem && (
                                    <Image style={styles.productImage} src={product.imagem} />
                                )}
                                <Text style={styles.description}>{product.descricao}</Text>
                            </View>
                            {product.variacoes && product.variacoes.length > 0 && (
                                <View style={styles.variations}>
                                    {product.variacoes.map((variation) => (
                                        <View key={variation.id} style={styles.variationRow}>
                                            <Text>{variation.tamanho}</Text>
                                            <Text>{`R$ ${variation.preco}`}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {index < products.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                </Page>
            </Document>
        );

        const blob = await pdf(doc).toBlob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'menu.pdf';
        link.click();
    };

    if (error) {
        return <p>Erro ao carregar produtos: {error.message}</p>;
    }

    if (!products || products.length === 0) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div style={{width:'50%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight:"5vh"}}>
            <Button type="primary" htmlType="submit" style={{ width: "50%" }} onClick={handleDownloadPDF}>Baixar Cardápio</Button>
        </div>
    );
};
