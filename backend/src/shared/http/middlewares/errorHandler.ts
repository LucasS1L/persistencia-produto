import {NextFunction, Request, Response} from "express";
import AppError from "../../errors/AppError";
import {isCelebrateError} from "celebrate";

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log("\n");
    console.error(error);
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    if (isCelebrateError(error)) {
        const errorBody = error.details.get("body");
        return response.status(400).json({
            status: "error",
            message: errorBody?.message || error.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};