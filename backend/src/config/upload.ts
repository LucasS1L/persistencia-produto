import path from "path";
import multer from "multer";
import crypto from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
    tmpFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash: string = crypto.randomBytes(10).toString("hex");
                const filename: string = fileHash + "-" + file.originalname;
                callback(null, filename);
            }
        }),
    },
    config: {
        aws: {
            bucket: process.env.S3_BUCKET
        }
    }

};
