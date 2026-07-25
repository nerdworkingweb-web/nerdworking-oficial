import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { YouTubeVideo } from "@/lib/youtube";

interface YouTubeVideosProps {
  videos: YouTubeVideo[];
}

export function YouTubeVideos({ videos }: YouTubeVideosProps) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {videos.map((video, i) => (
        <AnimatedSection key={video.id} delay={i * 80}>
          <article className="group">
            <div className="aspect-video bg-[var(--surface)] rounded-xl overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              {video.title}
            </h4>
            {video.description && (
              <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed line-clamp-3">
                {video.description}
              </p>
            )}
            <time
              dateTime={video.publishedAt}
              className="text-xs text-[var(--muted)]"
            >
              {new Date(video.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </article>
        </AnimatedSection>
      ))}
    </div>
  );
}
