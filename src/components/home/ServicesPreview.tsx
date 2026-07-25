import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Service } from "@/lib/types";

const ICONS: Record<string, string> = {
  network: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  mic: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  megaphone: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  target: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  rocket: "M13 10V3L4 14h7v7l9-11h-7z",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
};

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="relative py-16 md:py-24 border-b border-[var(--border)]">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Servicios"
            title="Oportunidades de negocio B2B"
            description="Conectamos empresas tecnológicas con tomadores de decisión de alto nivel en Latinoamérica."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 80}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group block h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={ICONS[service.icon] ?? ICONS.network}
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent-light)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {service.shortDescription}
                </p>
                <span className="inline-block mt-4 text-xs text-[var(--accent-light)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Conocer más →
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={300}>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors group"
          >
            Conocer todos los servicios
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
