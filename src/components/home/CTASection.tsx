import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]">
            <div className="absolute inset-0 bg-gradient-accent opacity-90" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />

            <div className="relative px-8 py-14 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                ¿Listo para conectar con la élite tech de LATAM?
              </h2>
              <div className="w-12 h-px bg-white/40 mx-auto mb-6" />
              <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Ya sea que busques nuevos clientes, auspiciar nuestro contenido
                o ser invitado al podcast, estamos aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contacto?tipo=cliente"
                  variant="inverse"
                  size="lg"
                >
                  Quiero ser cliente B2B
                </Button>
                <Button
                  href="/contacto?tipo=auspiciador"
                  variant="outline-light"
                  size="lg"
                >
                  Quiero auspiciar
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
