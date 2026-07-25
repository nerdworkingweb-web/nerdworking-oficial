import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/content";
import { fetchYouTubeVideosDetailed } from "@/lib/youtube";

export async function GET() {
  const site = await getSiteConfig();
  const result = await fetchYouTubeVideosDetailed(site.youtubeChannelId);

  if (!result.ok) {
    return NextResponse.json(
      { videos: [], error: result.error },
      { status: result.status && result.status >= 400 ? 502 : 200 }
    );
  }

  return NextResponse.json(result.videos);
}
