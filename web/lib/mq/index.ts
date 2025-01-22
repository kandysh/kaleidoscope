import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL as string);

export const videoQueue = new Queue('Video-queue', { connection });
