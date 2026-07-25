import fs from "fs/promises";
import path from "path";
import { get, put } from "@vercel/blob";

const CONTENT_DIR = path.join(process.cwd(), "content");

function blobPath(filename: string) {
  return `content/${filename}`;
}

function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readFromBlob(filename: string): Promise<string | null> {
  if (!hasBlobStore()) return null;

  try {
    const result = await get(blobPath(filename), {
      access: "private",
      useCache: false,
    });

    // API oficial Blob Private: statusCode 200 + stream
    if (!result || result.statusCode !== 200 || !result.stream) {
      return null;
    }

    return await new Response(result.stream).text();
  } catch {
    return null;
  }
}

async function readFromDisk(filename: string): Promise<string> {
  const filePath = path.join(CONTENT_DIR, filename);
  return fs.readFile(filePath, "utf-8");
}

export async function readJson<T>(filename: string): Promise<T> {
  const fromBlob = await readFromBlob(filename);
  if (fromBlob != null) {
    return JSON.parse(fromBlob) as T;
  }
  const fromDisk = await readFromDisk(filename);
  return JSON.parse(fromDisk) as T;
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  const payload = JSON.stringify(data, null, 2);

  if (hasBlobStore()) {
    await put(blobPath(filename), payload, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "En Vercel no se puede guardar en disco. Configura BLOB_READ_WRITE_TOKEN (Storage → Blob) en el proyecto."
    );
  }

  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, payload, "utf-8");
}

export function isPersistentStorageConfigured() {
  return hasBlobStore() || !process.env.VERCEL;
}
