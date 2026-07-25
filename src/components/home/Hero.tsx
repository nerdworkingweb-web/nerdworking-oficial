import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface HeroProps {
  tagline: string;
}

export function Hero({ tagline }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent-glow),transparent_60%)]" />

      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <p className="text-xs font-medium tracking-widest uppercase text-[var(--accent-light)]">
                  Nerdworking · Medio B2B · Latinoamérica
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--foreground)] leading-[1.1] mb-4">
                <span className="text-gradient">Nerdworking</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--foreground)] leading-snug mb-6">
                {tagline}
              </p>

              <div className="w-16 h-px bg-gradient-accent mb-6" />

              <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-xl">
                El medio B2B de tecnología fundado por Manuel Vargas. Contenido,
                conexiones y oportunidades para CIOs, CTOs y líderes que impulsan
                la transformación digital en Latinoamérica.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contacto" size="lg">
                  Conversemos
                </Button>
                <Button href="/podcast" variant="secondary" size="lg">
                  Escuchar podcast
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-hover glow-accent">
              <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-[var(--accent)]/10 blur-2xl animate-float" />
              <p className="text-xs font-medium tracking-widest uppercase text-[var(--accent-light)] mb-3">
                Destacado
              </p>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                El futuro de la IA en empresas latinoamericanas
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                Conversaciones con líderes que están definiendo la estrategia
                tecnológica de la región.
              </p>
              <Button href="/podcast" variant="secondary" size="sm">
                Escuchar ahora →
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
