import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PodcastInviteCTA } from "@/components/podcast/PodcastInviteCTA";
import { YouTubeVideos } from "@/components/podcast/YouTubeVideos";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return createPageMetadata({
    title: "Podcast Nerdworking con Manuel Vargas",
    description:
      "Podcast de Nerdworking conducido por Manuel Vargas: conversaciones con CIOs, CTOs y líderes de tecnología en Latinoamérica. Episodios, invitados y próximos capítulos.",
    path: "/podcast",
    keywords: ["podcast Nerdworking", "Manuel Vargas podcast", "podcast CIO LATAM"],
  });
}

export default async function PodcastPage() {
  const site = await getSiteConfig();
  const youtubeVideos = site.youtubeChannelId
    ? await fetchYouTubeVideos(site.youtubeChannelId, 8)
    : [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Podcast", url: `${site.url}/podcast` },
        ])}
      />

      <Container as="section" className="py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            label="Podcast Nerdworking"
            title="Conversaciones con líderes de tecnología"
            description="El podcast de Nerdworking con Manuel Vargas: entrevistas profundas con ejecutivos que están transformando empresas en Latinoamérica."
          />
        </AnimatedSection>

        <div className="mt-12">
          {youtubeVideos.length > 0 ? (
            <YouTubeVideos videos={youtubeVideos} />
          ) : (
            <p className="text-sm text-[var(--muted)] text-center py-12">
              No hay videos disponibles por el momento.
            </p>
          )}
        </div>

        <PodcastInviteCTA />
      </Container>
    </>
  );
}
