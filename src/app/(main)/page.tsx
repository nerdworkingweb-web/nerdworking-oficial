import { VideoHero } from "@/components/home/VideoHero";
import { Hero } from "@/components/home/Hero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PodcastPreview } from "@/components/home/PodcastPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CTASection } from "@/components/home/CTASection";
import {
  getSiteConfig,
  getPodcastEpisodes,
  getServices,
} from "@/lib/content";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { createPageMetadata } from "@/lib/seo";
import type { PodcastEpisode } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return createPageMetadata({
    title: `${site.name} — Medio B2B de Tecnología en Latinoamérica`,
    description: `${site.description} Fundado por ${site.founder.name}.`,
    path: "/",
    keywords: [
      "Nerdworking home",
      "Manuel Vargas podcast",
      "medio tecnología LATAM",
    ],
  });
}

export default async function HomePage() {
  const site = await getSiteConfig();
  const [episodes, services, youtubeVideos] = await Promise.all([
    getPodcastEpisodes(),
    getServices(),
    site.youtubeChannelId
      ? fetchYouTubeVideos(site.youtubeChannelId, 3)
      : Promise.resolve([]),
  ]);

  const podcastEpisodes: PodcastEpisode[] =
    youtubeVideos.length > 0
      ? youtubeVideos.map((video) => ({
          id: video.id,
          title: video.title,
          description: video.description,
          youtubeId: video.id,
          guest: "YouTube",
          publishedAt: video.publishedAt,
        }))
      : episodes;

  return (
    <>
      <VideoHero />
      <Hero tagline={site.tagline} />
      <FeaturesSection />
      <PodcastPreview episodes={podcastEpisodes} />
      <ServicesPreview services={services} />
      <CTASection />
    </>
  );
}
