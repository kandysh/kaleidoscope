import { createNewBucket, minioClient } from "@/lib/minio";
import { IMG_BUCKET } from "@/lib/minio/buckets";
import { errorResponse, successResponse } from "@/lib/template/response";
import multer from "multer";
import {v7 as uuid} from 'uuid';
import pino from 'pino';
import path from 'path';

const logger = pino();

const upload = multer({
    storage: multer.memoryStorage()

})

export async function POST(request: Request) {
    const form = await request.formData();
    const file = form.get('file') as File;

    if (!file) {
        return errorResponse('No file uploaded');
    }

    const objectName = `${uuid()}-${path.extname(file.name)}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    try {
        await createNewBucket(IMG_BUCKET);
        await minioClient.putObject(IMG_BUCKET, objectName, fileBuffer);
        return successResponse(`File uploaded successfully! fileName: ${objectName }`);
    } catch (error) {
        return errorResponse(`MinIO upload failed: ${(error as Error).message}`, 500);
    }
}
