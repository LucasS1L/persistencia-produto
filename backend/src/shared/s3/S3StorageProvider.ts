import fs from "fs";
import path from "path";
import uploadConfig from "../../config/upload";
import AppError from "../errors/AppError";
import {s3Client} from "./s3Client";
import {DeleteObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {lookup} from "mime-types";

export default class S3StorageProvider {
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const ContentType = lookup(originalPath);

        if (!ContentType) {
            throw new AppError("Ocorreu um erro na inclusão do arquivo", 500);
        }

        const fileContent = await fs.promises.readFile(originalPath);

        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: file,
            Body: fileContent,
            ContentType,
        });

        await s3Client.send(uploadCommand);
        await fs.promises.unlink(originalPath);
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: file,
        });
        try {
            await s3Client.send(deleteCommand);
        } catch (error) {
            console.log("Erro ao recuperar arquivo:" + error);
        }
    }
}