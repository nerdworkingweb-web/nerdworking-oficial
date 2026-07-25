import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
    title: "Contenido de alto nivel",
    description:
      "Noticias, análisis y entrevistas pensadas para ejecutivos de tecnología.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Red de decisores",
    description:
      "Conectamos empresas tech con CIOs, CTOs y líderes de innovación en LATAM.",
  },
  {
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    title: "Podcast ejecutivo",
    description:
      "Conversaciones profundas con quienes lideran la transformación digital.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Oportunidades B2B",
    description:
      "Generamos conexiones comerciales de alto valor entre empresas y ejecutivos.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--border)]">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Por qué Nerdworking"
            title="Más que un medio de comunicación"
            description="Una plataforma diseñada para quienes toman decisiones de tecnología y negocio en la región."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 100}>
              <div className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-5 glow-accent group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
