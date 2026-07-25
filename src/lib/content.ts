import fs from "fs/promises";
import path from "path";
import type {
  LinkedInEmbed,
  LinkedInPost,
  NewsArticle,
  PodcastEpisode,
  Service,
  SiteConfig,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return readJson<SiteConfig>("site.json");
}

export async function saveSiteConfig(site: SiteConfig): Promise<void> {
  await writeJson("site.json", site);
}

export async function getNews(): Promise<NewsArticle[]> {
  const articles = await readJson<NewsArticle[]>("news.json");
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await getNews();
  return articles.find((a) => a.slug === slug) ?? null;
}

export async function getFeaturedNews(limit = 3): Promise<NewsArticle[]> {
  const articles = await getNews();
  const featured = articles.filter((a) => a.featured);
  return (featured.length >= limit ? featured : articles).slice(0, limit);
}

export async function saveNews(articles: NewsArticle[]): Promise<void> {
  await writeJson("news.json", articles);
}

export async function getServices(): Promise<Service[]> {
  const services = await readJson<Service[]>("services.json");
  return services.sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function saveServices(services: Service[]): Promise<void> {
  await writeJson("services.json", services);
}

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const episodes = await readJson<PodcastEpisode[]>("podcast.json");
  return episodes.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getUpcomingEpisodes(): Promise<PodcastEpisode[]> {
  const episodes = await getPodcastEpisodes();
  return episodes.filter((e) => e.upcoming);
}

export async function getPublishedEpisodes(): Promise<PodcastEpisode[]> {
  const episodes = await getPodcastEpisodes();
  return episodes.filter((e) => !e.upcoming);
}

export async function savePodcast(episodes: PodcastEpisode[]): Promise<void> {
  await writeJson("podcast.json", episodes);
}

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  const posts = await readJson<LinkedInPost[]>("linkedin-posts.json");
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getLinkedInEmbeds(): Promise<LinkedInEmbed[]> {
  try {
    const embeds = await readJson<LinkedInEmbed[]>("linkedin-embeds.json");
    return embeds.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function saveLinkedInEmbeds(
  embeds: LinkedInEmbed[]
): Promise<void> {
  await writeJson("linkedin-embeds.json", embeds);
}

export function parseLinkedInEmbedInput(input: string): {
  urn: string;
  embedUrl: string;
} | null {
  const raw = input.trim();
  if (!raw) return null;

  const urnMatch = raw.match(
    /urn:li:(?:share|ugcPost|activity):\d+/i
  );
  if (urnMatch) {
    const urn = urnMatch[0];
    return {
      urn,
      embedUrl: `https://www.linkedin.com/embed/feed/update/${urn}?collapsed=1`,
    };
  }

  const srcMatch = raw.match(
    /src=["'](https:\/\/www\.linkedin\.com\/embed\/feed\/update\/[^"']+)["']/i
  );
  if (srcMatch) {
    const embedUrl = srcMatch[1];
    const urnFromUrl = embedUrl.match(
      /urn:li:(?:share|ugcPost|activity):\d+/i
    )?.[0];
    if (!urnFromUrl) return null;
    return { urn: urnFromUrl, embedUrl };
  }

  if (raw.startsWith("https://www.linkedin.com/embed/feed/update/")) {
    const urnFromUrl = raw.match(
      /urn:li:(?:share|ugcPost|activity):\d+/i
    )?.[0];
    if (!urnFromUrl) return null;
    return { urn: urnFromUrl, embedUrl: raw };
  }

  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
