"use client";

import { Button } from "@/components/ui/Button";
import {
  UnrollReveal,
  StaggerItem,
  useScrollReveal,
} from "@/components/ui/UnrollReveal";

export function PodcastInviteCTA() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <div ref={ref} className="mt-20 md:mt-28">
      <UnrollReveal
        visible={visible}
        marquee={[
          "Podcast",
          "Invitados",
          "CIOs",
          "CTOs",
          "LATAM",
          "Nerdworking",
        ]}
      >
        <div className="text-center max-w-xl mx-auto">
          <StaggerItem index={0} visible={visible}>
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--muted)] mb-5">
              Únete al podcast
            </p>
          </StaggerItem>

          <StaggerItem index={1} visible={visible}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-4 leading-tight">
              ¿Quieres ser invitado al podcast?
            </h3>
          </StaggerItem>

          <StaggerItem index={2} visible={visible}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className={`h-px bg-neutral-300 transition-all duration-1000 ease-out ${
                  visible ? "w-16" : "w-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span
                className={`h-px bg-neutral-300 transition-all duration-1000 ease-out ${
                  visible ? "w-16" : "w-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              />
            </div>
          </StaggerItem>

          <StaggerItem index={3} visible={visible}>
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-8">
              Comparte tu experiencia con ejecutivos y líderes de tecnología en
              Latinoamérica.
            </p>
          </StaggerItem>

          <StaggerItem index={4} visible={visible}>
            <Button href="/contacto?tipo=invitado" size="lg">
              Contáctanos
            </Button>
          </StaggerItem>
        </div>
      </UnrollReveal>
    </div>
  );
}
