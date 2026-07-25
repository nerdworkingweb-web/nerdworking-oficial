import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { LinkedInPost } from "@/lib/types";

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;

  return date.toLocaleDateString("es-LA", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LinkedInPostCard({ post }: { post: LinkedInPost }) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="linkedin-post flex flex-col h-full min-h-[480px] rounded-xl border border-[var(--li-border)] bg-[var(--li-card)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 card-hover">
      {/* Header — altura fija */}
      <div className="flex items-start gap-3 p-4 pb-3 shrink-0 h-[88px]">
        <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0 text-white font-semibold text-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-[var(--li-text)] text-sm leading-tight truncate">
                {post.author}
              </p>
              <p className="text-xs text-[var(--li-muted)] leading-snug mt-0.5 line-clamp-1">
                {post.authorRole}
              </p>
              <p className="text-xs text-[var(--li-muted)] mt-0.5">
                {formatRelativeDate(post.publishedAt)}
              </p>
            </div>
            <LinkedInIcon className="w-5 h-5 text-[#0A66C2] shrink-0" />
          </div>
        </div>
      </div>

      {/* Contenido — altura fija con clamp */}
      <div className="px-4 pb-3 shrink-0 h-[120px]">
        <p className="text-sm text-[var(--li-text)] leading-relaxed line-clamp-5">
          {post.content}
        </p>
      </div>

      {/* Media — siempre misma altura */}
      <div className="mx-4 mb-3 shrink-0 h-[100px] rounded-lg overflow-hidden border border-[var(--li-border)] bg-[#0A66C2]/5 flex items-center justify-center">
        {post.imageCaption ? (
          <div className="text-center px-4">
            <LinkedInIcon className="w-6 h-6 text-[#0A66C2] mx-auto mb-1.5 opacity-60" />
            <p className="text-xs font-medium text-[var(--li-text)] line-clamp-2">
              {post.imageCaption}
            </p>
          </div>
        ) : (
          <LinkedInIcon className="w-6 h-6 text-[#0A66C2]/20" />
        )}
      </div>

      {/* Footer — pegado al fondo */}
      <div className="mt-auto shrink-0">
        <div className="px-4 py-2 flex items-center justify-between text-xs text-[var(--li-muted)] border-t border-[var(--li-divider)] h-[36px]">
          <span className="flex items-center gap-1">
            <span className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[8px]">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-[#DF704D] flex items-center justify-center text-white text-[8px]">
                ❤️
              </span>
            </span>
            <span className="ml-1">{post.likes}</span>
          </span>
          <span className="truncate ml-2">
            {post.comments} · {post.reposts}
          </span>
        </div>

        <div className="px-2 py-1 flex items-center border-t border-[var(--li-divider)] h-[44px]">
          {[
            { label: "Recomendar", icon: "M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" },
            { label: "Comentar", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
            { label: "Compartir", icon: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" },
            { label: "Enviar", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className="flex-1 flex items-center justify-center py-2 text-[var(--li-muted)] hover:bg-[var(--li-hover)] rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
              </svg>
            </button>
          ))}
        </div>

        <div className="px-4 py-3 bg-[var(--li-footer)] border-t border-[var(--li-divider)] h-[44px] flex items-center">
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0A66C2] hover:underline flex items-center gap-1"
          >
            Ver en LinkedIn
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

interface LinkedInFeedProps {
  posts: LinkedInPost[];
}

const LINKEDIN_EMBED_SRC =
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7485515599507333121?collapsed=1";

export function LinkedInFeed({ posts }: LinkedInFeedProps) {
  return (
    <section className="mb-16">
      <AnimatedSection>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <LinkedInIcon className="w-6 h-6 text-[#0A66C2]" />
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Desde LinkedIn
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20">
            Embed
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
          Publicaciones de Nerdworking y su equipo en LinkedIn.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={50} className="mb-10">
        <div className="flex justify-center lg:justify-start">
          <iframe
            src={LINKEDIN_EMBED_SRC}
            height={669}
            width={504}
            className="max-w-full rounded-xl border border-[var(--border)] bg-[var(--card)]"
            frameBorder={0}
            allowFullScreen
            title="Publicación integrada de LinkedIn"
          />
        </div>
      </AnimatedSection>

      {posts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 100} className="h-full">
              <LinkedInPostCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  );
}
