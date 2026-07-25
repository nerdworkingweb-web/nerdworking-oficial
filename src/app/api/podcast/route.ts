import { NextResponse } from "next/server";
import { getPodcastEpisodes, savePodcast } from "@/lib/content";
import { verifyAdminToken } from "@/lib/auth";
import type { PodcastEpisode } from "@/lib/types";

export async function GET() {
  const episodes = await getPodcastEpisodes();
  return NextResponse.json(episodes);
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const episodes: PodcastEpisode[] = await request.json();
  await savePodcast(episodes);
  return NextResponse.json({ success: true });
}
