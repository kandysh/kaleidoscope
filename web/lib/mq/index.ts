import pino from "pino";
import { createClient } from "redis";

const logger = pino();
export const redisClient = createClient({
    url: process.env.REDIS_URL as string
})

redisClient.on('error', error => {
    logger.error(`Redis client error:`, error);
});

