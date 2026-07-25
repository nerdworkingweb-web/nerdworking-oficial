"use client";

import { useEffect, useRef } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[21/9] md:aspect-[21/8] max-h-[70vh]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source src="/video-1.mp4" type="video/mp4" />
        </video>

        <div className="video-hero-overlay absolute inset-0" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 lg:px-10 pb-8 md:pb-12">
            <AnimatedSection>
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-md mb-4">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
                  <span className="text-xs font-medium tracking-widest uppercase text-[var(--accent-light)]">
                    En vivo · Nerdworking · Manuel Vargas
                  </span>
                </div>
                <p className="text-sm md:text-base text-[var(--muted)] max-w-lg leading-relaxed">
                  Nerdworking, el medio B2B de Manuel Vargas que conecta
                  tecnología, negocios y líderes en Latinoamérica.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="w-full h-px bg-[var(--accent)] animate-[scan-line_8s_linear_infinite]" />
        </div>
      </div>
    </section>
  );
}
