import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NEWS_CATEGORIES } from "@/lib/constants";
import type { NewsArticle } from "@/lib/types";

interface LatestNewsProps {
  articles: NewsArticle[];
}

export function LatestNews({ articles }: LatestNewsProps) {
  return (
    <section className="relative py-16 md:py-24 border-b border-[var(--border)]">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Noticias"
            title="Lo último en tecnología y negocios"
            description="Análisis y tendencias relevantes para quienes lideran la innovación en Latinoamérica."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 100}>
              <Link
                href={`/noticias/${article.slug}`}
                className="group block h-full"
              >
                <article className="h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-hover flex flex-col">
                  <div className="mb-4">
                    <Badge>{NEWS_CATEGORIES[article.category].label}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-light)] transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <time className="text-xs text-[var(--muted)]">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "es-LA",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <span className="text-xs text-[var(--accent-light)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Leer →
                    </span>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={300}>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors group"
          >
            Ver todas las noticias
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
