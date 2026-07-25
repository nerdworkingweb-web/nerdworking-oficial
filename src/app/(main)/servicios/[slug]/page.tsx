import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServices, getServiceBySlug, getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return createPageMetadata({
    title: `${service.title} — Servicios Nerdworking`,
    description: `${service.shortDescription} Conoce este servicio de Nerdworking, medio B2B de tecnología en Latinoamérica fundado por Manuel Vargas.`,
    path: `/servicios/${service.slug}`,
    keywords: [service.title, "servicios Nerdworking", "Manuel Vargas"],
  });
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const [service, site] = await Promise.all([
    getServiceBySlug(slug),
    getSiteConfig(),
  ]);

  if (!service) notFound();

  const paragraphs = service.description.split("\n\n");

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service, site),
          breadcrumbSchema([
            { name: "Inicio", url: site.url },
            { name: "Servicios", url: `${site.url}/servicios` },
            {
              name: service.title,
              url: `${site.url}/servicios/${service.slug}`,
            },
          ]),
        ]}
      />

      <Container as="article" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/servicios"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8 inline-block"
          >
            ← Volver a servicios
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-6">
            {service.title}
          </h1>

          <p className="text-lg text-[var(--muted)] leading-relaxed mb-10">
            {service.shortDescription}
          </p>

          <div className="prose-content text-base mb-12">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {service.benefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Beneficios
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-[var(--muted)]"
                  >
                    <svg
                      className="w-5 h-5 text-[var(--foreground)] shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button href="/contacto?tipo=cliente" size="lg">
            Solicitar información
          </Button>
        </div>
      </Container>
    </>
  );
}
