import ProdutoController from "../controllers/ProdutoController";
import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import verificaProduto from "../middlewares/verificaProduto";

const produtoRouter = Router();
const produtoController = new ProdutoController();
const upload = multer(uploadConfig.multer);

produtoRouter.get("/",
    produtoController.index
);

produtoRouter.get("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
    }),
    produtoController.show
);


produtoRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().trim().max(50).required(),
            descricao: Joi.string().trim().max(300).required(),
            tamanho: Joi.string().trim().max(10).required(),
            preco: Joi.number().precision(2).required(),
        },
    }),
    produtoController.create
);

produtoRouter.patch("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().trim().max(50).optional(),
            descricao: Joi.string().trim().max(300).optional(),
        }).or("nome", "descricao"),
    }),
    produtoController.update
);

produtoRouter.delete("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
    }),
    produtoController.delete
);

produtoRouter.get("/:id/imagem",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
    }),
    produtoController.showImagem
);

produtoRouter.patch("/:id/imagem",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required(),
        },
    }),
    verificaProduto,
    upload.single("imagem"),
    produtoController.updateImagem
);

export default produtoRouter;