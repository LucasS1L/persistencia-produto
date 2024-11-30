import {Request, Response, Router} from "express";
import AppError from "../../errors/AppError";

const notFoundRouter = Router();

notFoundRouter.all("*", (request: Request, response: Response) => {
    throw new AppError("Rota não encontrada.", 404);
});

export {notFoundRouter};