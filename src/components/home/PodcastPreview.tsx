import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { PodcastEpisode } from "@/lib/types";

interface PodcastPreviewProps {
  episodes: PodcastEpisode[];
}

export function PodcastPreview({ episodes }: PodcastPreviewProps) {
  const published = episodes.filter((e) => !e.upcoming).slice(0, 3);

  return (
    <section className="relative py-16 md:py-24 bg-[var(--surface)]/50 border-b border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Container className="relative">
        <AnimatedSection>
          <SectionHeading
            label="Podcast"
            title="Conversaciones con líderes de tecnología"
            description="Entrevistas con CIOs, CTOs y ejecutivos que transforman empresas en la región."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {published.map((episode, i) => (
            <AnimatedSection key={episode.id} delay={i * 100}>
              <Link href="/podcast" className="group block">
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden card-hover">
                  {episode.youtubeId && (
                    <div className="aspect-video bg-[var(--surface)] overflow-hidden relative">
                      <img
                        src={`https://img.youtube.com/vi/${episode.youtubeId}/mqdefault.jpg`}
                        alt={episode.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-accent">
                          <svg
                            className="w-5 h-5 text-white ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-light)] transition-colors mb-2 leading-snug">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-2">
                      {episode.guest}
                      {episode.guestRole && (
                        <span> · {episode.guestRole}</span>
                      )}
                    </p>
                    {episode.duration && (
                      <span className="text-xs text-[var(--muted)]">
                        {episode.duration}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={300}>
          <Link
            href="/podcast"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors group"
          >
            Ver todos los episodios
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}

interface UpcomingEpisodeProps {
  episodes: PodcastEpisode[];
}

export function UpcomingEpisodes({ episodes }: UpcomingEpisodeProps) {
  if (episodes.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-hover"
        >
          <Badge variant="accent">Próximo</Badge>
          <div>
            <h4 className="text-sm font-medium text-[var(--foreground)]">
              {ep.title}
            </h4>
            <p className="text-xs text-[var(--muted)] mt-1">{ep.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
