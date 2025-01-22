import { Client, ClientOptions } from 'minio';
import pino from 'pino';

const logger = pino();


const clientOptions: ClientOptions = process.env.NODE_ENV !== 'development' ? {
    endPoint: process.env.BUCKET_URL as string,
    useSSL: true,
    accessKey: process.env.ACCESS_KEY as string,
    secretKey: process.env.SECRET_KEY as string,
    region: process.env.BUCKET_REGION as string,
} : {
    endPoint: process.env.BUCKET_URL as string,
    useSSL: false,
    port: 9000,
    accessKey: process.env.ACCESS_KEY as string,
    secretKey: process.env.SECRET_KEY as string,
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
