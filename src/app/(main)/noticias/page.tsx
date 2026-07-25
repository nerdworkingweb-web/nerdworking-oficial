import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLinkedInEmbeds, getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export async function generateMetadata() {
  return createPageMetadata({
    title: "Noticias Nerdworking — Tecnología y negocios",
    description:
      "Noticias y publicaciones de Nerdworking, el medio B2B de tecnología fundado por Manuel Vargas. IA, ciberseguridad, cloud y transformación digital en Latinoamérica.",
    path: "/noticias",
    keywords: ["noticias Nerdworking", "tecnología LATAM", "Manuel Vargas LinkedIn"],
  });
}

export default async function NoticiasPage() {
  const [site, embeds] = await Promise.all([
    getSiteConfig(),
    getLinkedInEmbeds(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Noticias", url: `${site.url}/noticias` },
        ])}
      />
      <Container as="section" className="py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            label="Noticias Nerdworking"
            title="Tecnología, negocios e innovación"
            description="Publicaciones de Nerdworking y Manuel Vargas: análisis y novedades para líderes de tecnología en Latinoamérica."
          />
        </AnimatedSection>

        <section className="mt-12">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <LinkedInIcon className="w-6 h-6 text-[#0A66C2]" />
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                Desde LinkedIn
              </h2>
            </div>
            <p className="text-sm text-[var(--muted)] mb-8 max-w-2xl">
              Publicaciones de Nerdworking y Manuel Vargas en LinkedIn.
            </p>
          </AnimatedSection>

          {embeds.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Pronto verás aquí las publicaciones de LinkedIn.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {embeds.map((embed, i) => (
                <AnimatedSection key={embed.id} delay={i * 60}>
                  <div className="flex justify-center md:justify-start">
                    <iframe
                      src={embed.embedUrl}
                      height={669}
                      width={504}
                      className="max-w-full w-full rounded-xl border border-[var(--border)] bg-[var(--card)]"
                      frameBorder={0}
                      allowFullScreen
                      title={`Publicación LinkedIn ${embed.urn}`}
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
