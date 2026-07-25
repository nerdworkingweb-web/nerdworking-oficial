import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return createPageMetadata({
    title: "Nosotros — Nerdworking y Manuel Vargas",
    description:
      "Conoce Nerdworking y a su fundador Manuel Vargas: historia, propósito y visión del medio B2B de tecnología de Latinoamérica.",
    path: "/nosotros",
    keywords: [
      "Manuel Vargas",
      "fundador Nerdworking",
      "quién es Manuel Vargas",
      "acerca de Nerdworking",
    ],
  });
}

export default async function NosotrosPage() {
  const site = await getSiteConfig();
  const { about, founder } = site;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Nosotros — Nerdworking y Manuel Vargas", url: `${site.url}/nosotros` },
        ])}
      />

      <Container as="section" className="py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            label="Nosotros · Nerdworking"
            title="Nerdworking y Manuel Vargas: referencia en tecnología y negocios"
            description="Nerdworking es más que un medio: es el espacio creado por Manuel Vargas donde la innovación tecnológica se encuentra con la estrategia de negocio en Latinoamérica."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {[
            { title: "Historia", content: about.history },
            { title: "Propósito", content: about.purpose },
            { title: "Visión", content: about.vision },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-[var(--muted)] mb-4">
                  {item.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed text-sm">
                  {item.content}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <div className="border-t border-[var(--border)] pt-16">
            <h3 className="text-sm font-medium tracking-widest uppercase text-[var(--muted)] mb-8">
              Fundador de Nerdworking
            </h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 rounded-full bg-[var(--surface)] flex items-center justify-center shrink-0">
                <span className="text-2xl font-semibold text-[var(--muted)]">
                  {founder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="max-w-2xl">
                <h4 className="text-xl font-semibold text-[var(--foreground)] mb-1">
                  {founder.name}
                </h4>
                <p className="text-sm text-[var(--muted)] mb-4">{founder.role}</p>
                <p className="text-[var(--muted)] leading-relaxed text-sm">
                  {founder.bio}
                </p>
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </>
  );
}
