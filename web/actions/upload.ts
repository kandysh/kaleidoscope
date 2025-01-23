"use server";
import { db } from "@/lib/db";
import { mediaTable } from "@/lib/db/schema";
import { createNewBucket, minioClient } from "@/lib/minio";
import { VID_BUCKET } from "@/lib/minio/buckets";
import { videoQueue } from "@/lib/mq";


export const upload = async (media: typeof mediaTable.$inferInsert) => {
    return await db.transaction(async (tx) => {
        const added = await tx.insert(mediaTable).values(media).returning({ insertedId: mediaTable.id });
        const presingedUrl = await minioClient.presignedPutObject(VID_BUCKET, added[0].insertedId);
        return ({ presingedUrl, added })
    });
}

export const fetchVideoUrl = async (mediaId: string) => await minioClient.presignedGetObject(VID_BUCKET, mediaId);


export const pushToVideoQueue = async (media: typeof mediaTable.$inferSelect, presignedGetUrl: string) => {
    await videoQueue.add('uploadSuccess', { ...media, presignedGetUrl });
}
