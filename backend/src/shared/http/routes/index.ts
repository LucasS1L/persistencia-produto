import {Router} from "express";
import produtoRouter from "../../../modules/produto/routes/produto.routes";
import produtoVariacaoRouter from "../../../modules/produto/routes/produtoVariacao.routes";
import {notFoundRouter} from "./notFoundRoute";

const routes = Router();

routes.use("/api/v1/produtos", produtoRouter);
routes.use("/api/v1/produtos/variacoes", produtoVariacaoRouter);

routes.use(notFoundRouter);

export default routes;