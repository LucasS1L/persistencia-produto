import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";
import ProdutoVariacaoController from "../controllers/ProdutoVariacaoController";

const produtoVariacaoRouter = Router();
const produtoVariacaoController = new ProdutoVariacaoController();

produtoVariacaoRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            produtoId: Joi.number().integer().min(1).required(),
            tamanho: Joi.string().trim().max(10).required(),
            preco: Joi.number().precision(2).required(),
        },
    }),
    produtoVariacaoController.add
);

produtoVariacaoRouter.patch("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
        [Segments.BODY]: Joi.object().keys({
            tamanho: Joi.string().trim().max(10),
            preco: Joi.number().precision(2),
        }).or("tamanho", "preco"),
    }),
    produtoVariacaoController.update
);

produtoVariacaoRouter.delete("/:id",
    produtoVariacaoController.delete
);

export default produtoVariacaoRouter;