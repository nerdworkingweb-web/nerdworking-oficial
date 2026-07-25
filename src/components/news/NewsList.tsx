"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NEWS_CATEGORIES } from "@/lib/constants";
import type { LinkedInPost, NewsArticle, NewsCategory } from "@/lib/types";
import { LinkedInFeed } from "@/components/news/LinkedInFeed";

interface NewsListProps {
  articles: NewsArticle[];
  linkedinPosts?: LinkedInPost[];
}

export function NewsList({ articles, linkedinPosts = [] }: NewsListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<NewsCategory | "all">("all");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = category === "all" || a.category === category;
      const matchesSearch =
        search === "" ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, search, category]);

  return (
    <Container as="section" className="py-16 md:py-24">
      <AnimatedSection>
        <SectionHeading
          label="Noticias"
          title="Tecnología, negocios e innovación"
          description="Análisis y noticias relevantes para líderes de tecnología en Latinoamérica."
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="search"
            placeholder="Buscar noticias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 input-field px-4 py-2.5 rounded-xl text-sm"
          />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as NewsCategory | "all")
            }
            className="input-field px-4 py-2.5 rounded-xl text-sm"
          >
            <option value="all">Todas las categorías</option>
            {Object.entries(NEWS_CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </AnimatedSection>

      <LinkedInFeed posts={linkedinPosts} />

      {filtered.length === 0 ? (
        <p className="text-[var(--muted)] text-sm text-center py-12">
          No se encontraron noticias con esos criterios.
        </p>
      ) : (
        <div className="space-y-8">
          {filtered.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 50}>
              <Link href={`/noticias/${article.slug}`} className="group block">
                <article className="pb-8 border-b border-[var(--border)] last:border-0">
                  <div className="mb-3">
                    <Badge>{NEWS_CATEGORIES[article.category].label}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--muted)] transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-3 max-w-3xl">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                    <span>{article.author}</span>
                    <span>·</span>
                    <time>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "es-LA",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </time>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      )}
    </Container>
  );
}
