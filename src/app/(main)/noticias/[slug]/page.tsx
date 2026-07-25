import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNews, getNewsBySlug, getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { NEWS_CATEGORIES } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getNews();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/noticias/${article.slug}`,
    type: "article",
    image: article.image,
  });
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const [article, site] = await Promise.all([
    getNewsBySlug(slug),
    getSiteConfig(),
  ]);

  if (!article) notFound();

  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <JsonLd
        data={[
          articleSchema(article, site),
          breadcrumbSchema([
            { name: "Inicio", url: site.url },
            { name: "Noticias", url: `${site.url}/noticias` },
            {
              name: article.title,
              url: `${site.url}/noticias/${article.slug}`,
            },
          ]),
        ]}
      />

      <Container as="article" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/noticias"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8 inline-block"
          >
            ← Volver a noticias
          </Link>

          <div className="mb-6">
            <Badge>{NEWS_CATEGORIES[article.category].label}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-10 pb-10 border-b border-[var(--border)]">
            <span>{article.author}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("es-LA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="prose-content text-base">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
