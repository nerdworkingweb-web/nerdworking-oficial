export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export type YouTubeFetchResult =
  | { ok: true; videos: YouTubeVideo[] }
  | { ok: false; error: string; status?: number };

function pickThumbnail(thumbnails?: {
  high?: { url: string };
  medium?: { url: string };
  default?: { url: string };
}): string {
  return (
    thumbnails?.high?.url ??
    thumbnails?.medium?.url ??
    thumbnails?.default?.url ??
    ""
  );
}

export async function fetchYouTubeVideos(
  channelId: string,
  maxResults = 6
): Promise<YouTubeVideo[]> {
  const result = await fetchYouTubeVideosDetailed(channelId, maxResults);
  return result.ok ? result.videos : [];
}

export async function fetchYouTubeVideosDetailed(
  channelId: string,
  maxResults = 6
): Promise<YouTubeFetchResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Falta YOUTUBE_API_KEY en .env.local" };
  }
  if (!channelId) {
    return { ok: false, error: "Falta youtubeChannelId en content/site.json" };
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    const channelData = await channelRes.json();

    if (!channelRes.ok) {
      const message =
        channelData?.error?.message ??
        `Error de YouTube al leer el canal (${channelRes.status})`;
      return { ok: false, error: message, status: channelRes.status };
    }

    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return {
        ok: false,
        error:
          "No se encontró la playlist de uploads. Verifica el youtubeChannelId.",
      };
    }

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    const playlistData = await playlistRes.json();

    if (!playlistRes.ok) {
      const message =
        playlistData?.error?.message ??
        `Error de YouTube al leer videos (${playlistRes.status})`;
      return { ok: false, error: message, status: playlistRes.status };
    }

    const videos: YouTubeVideo[] = (playlistData.items ?? []).map(
      (item: {
        snippet: {
          resourceId: { videoId: string };
          title: string;
          description: string;
          thumbnails?: {
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
          };
          publishedAt: string;
        };
      }) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: pickThumbnail(item.snippet.thumbnails),
        publishedAt: item.snippet.publishedAt,
      })
    );

    return { ok: true, videos };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Error de red al consultar YouTube",
    };
  }
}
