import { Client, ClientOptions } from 'minio';
import pino from 'pino';

const logger = pino();


const clientOptions: ClientOptions = {
    endPoint: process.env.MINIO_URL as string,
    port: parseInt(process.env.MINIO_PORT as string),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
}

export const minioClient = new Client(clientOptions);


export const createNewBucket = async (bucketName: string) => {
    if (await minioClient.bucketExists(bucketName)) {
        logger.info('Bucket %s already exists', bucketName)
        return;
    }
    await minioClient.makeBucket(bucketName);
    logger.info('Bucket %s created successfully', bucketName);
}
