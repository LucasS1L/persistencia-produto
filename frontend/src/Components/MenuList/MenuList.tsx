import { Menu } from "antd";
import {
    HomeOutlined,

    ProductOutlined,

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router/ROUTES.ts";

export default function MenuList() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Menu style={{ flex: 1, fontSize: "2.2vh", overflow: "auto" }} mode="inline">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to={ROUTES.home}>Home</Link>
                </Menu.Item>
                <Menu.SubMenu key="subProdutos" icon={<ProductOutlined />} title="Produtos">
                    <Menu.Item key="cadastraProduto"><Link to={ROUTES.createProduct}>Cadastrar Produtos</Link></Menu.Item>
                    <Menu.Item key="cadastraProdutoVariacao"><Link to={ROUTES.createProductVariant}>Cadastrar Variação de Produtos</Link></Menu.Item>
                    <Menu.Item key="visualizaProdutos"><Link to={ROUTES.showProducts}>Visualizar Produtos</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}
