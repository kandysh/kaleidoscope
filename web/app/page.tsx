"use client";

import { fetchVideoUrl, pushToVideoQueue, upload } from "@/actions/upload";
import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [mediaId, setMediaId] = useState<string | undefined>();
  const [mediaUrl, setMediaUrl] = useState<string | undefined>();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;
    const mediaPreSigned = await upload({
      name: file.name,
      lastModiiedDate: new Date(file.lastModified),
      type: file.type,
      size: file.size
    });
    setMediaId(mediaPreSigned.added[0].insertedId);

    await fetch(mediaPreSigned.presingedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type || 'application/octet-stream'
      }
    })
  }

  async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(event);
    await pushToVideoQueue({
      id: mediaId!,
      name: file!.name,
      type: file!.type,
      size: file!.size,
      lastModiiedDate: new Date(file!.lastModified)
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button type="button" onClick={async () => {
        const videoUrl = await fetchVideoUrl(mediaId!);

        setMediaUrl(videoUrl);
      }}>clikc</button>
      {mediaId && mediaUrl && <video width="320" height="240" controls preload="none">
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      }
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

          setFile(e.target.files![0]);
        }} />
        <button type="submit">Submit</button>
      </form>


      <button type="button" onClick={handleClick}>
        Click to send events
      </button>
    </div>
  );
}
