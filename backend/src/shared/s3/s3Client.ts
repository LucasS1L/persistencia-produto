import {S3Client} from "@aws-sdk/client-s3";
import * as process from "node:process";

export const s3Client = new S3Client({
    forcePathStyle: true,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_URL,
    credentials: {
        accessKeyId: process.env.S3_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
    }
});