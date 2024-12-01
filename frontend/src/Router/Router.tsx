import {Routes, Route} from "react-router-dom";
import {ROUTES} from "./ROUTES.ts";

import Home from "../Pages/Home/Home.tsx";


//produto
import CreateProduct from "../Pages/Product/CreateProduct/CreateProduct.tsx";
import ShowProducts from "../Pages/Product/ShowProducts/ShowProducts.tsx";
import EditProduct from "../Pages/Product/EditProducts/EditProducts.tsx";
import CreateProductVariant from "../Pages/Product/CreateProductVariant/CreateProductVariant.tsx";
import EditProductVariant from "../Pages/Product/EditProductVariant/EditProductVariant.tsx";




export default function Router(){
    return(
        <Routes>
            <Route path={ROUTES.home} element={ <Home/>}></Route>
            <Route path={ROUTES.createProduct} element={<CreateProduct/>}></Route>
            <Route path={ROUTES.createProductVariant} element={<CreateProductVariant/>}></Route>
            <Route path={ROUTES.showProducts} element={<ShowProducts/>}></Route>
            <Route path={`${ROUTES.editProducts}/:id`} element={<EditProduct/>}></Route>
            <Route path={`${ROUTES.editProductVariant}/:id/:variantId`} element={<EditProductVariant/>}></Route>

        </Routes>
    )
}