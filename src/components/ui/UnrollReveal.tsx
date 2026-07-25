"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface UnrollRevealProps {
  children: ReactNode;
  className?: string;
  marquee?: string[];
  visible?: boolean;
}

export function UnrollReveal({
  children,
  className = "",
  marquee = ["Podcast", "Invitados", "CIOs", "CTOs", "LATAM"],
  visible: visibleProp,
}: UnrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [internalVisible, setInternalVisible] = useState(false);
  const visible = visibleProp ?? internalVisible;

  useEffect(() => {
    if (visibleProp !== undefined) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInternalVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visibleProp]);

  const marqueeText = marquee.join("  ·  ") + "  ·  ";

  return (
    <div ref={ref} className={className}>
      <div
        className={`overflow-hidden border border-b-0 border-[var(--border)] rounded-t-2xl bg-[var(--card)] transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative py-2.5 mask-marquee">
          <div
            className={`flex whitespace-nowrap ${visible ? "animate-marquee" : ""}`}
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="text-[10px] font-medium tracking-[0.25em] uppercase text-neutral-300 px-4"
              >
                {marqueeText.repeat(4)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`unroll-panel relative rounded-b-2xl rounded-t-none border border-[var(--border)] bg-[var(--surface)] overflow-hidden ${
          visible ? "unroll-active" : "unroll-idle"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

        <div
          className={`absolute top-0 left-0 right-0 h-px bg-neutral-300 origin-center transition-transform duration-1000 ease-out ${
            visible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-neutral-300 origin-center transition-transform duration-1000 ease-out ${
            visible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        />
        <div
          className={`absolute top-0 bottom-0 left-0 w-px bg-neutral-200 origin-top transition-transform duration-700 ease-out ${
            visible ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        />
        <div
          className={`absolute top-0 bottom-0 right-0 w-px bg-neutral-200 origin-top transition-transform duration-700 ease-out ${
            visible ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        />

        <div
          className={`absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[var(--border)] transition-all duration-[1.4s] ease-out pointer-events-none ${
            visible
              ? "opacity-100 rotate-[360deg] scale-100"
              : "opacity-0 rotate-0 scale-50"
          }`}
        />
        <div
          className={`absolute -right-16 top-1/3 w-32 h-32 rounded-full border border-dashed border-[var(--border)] transition-all duration-[1.6s] ease-out pointer-events-none ${
            visible
              ? "opacity-60 rotate-[-180deg] scale-100"
              : "opacity-0 rotate-0 scale-50"
          }`}
          style={{ transitionDelay: "200ms" }}
        />

        <div className="relative px-8 py-14 md:px-16 md:py-20">{children}</div>
      </div>
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  visible: boolean;
  className?: string;
}

export function StaggerItem({
  children,
  index,
  visible,
  className = "",
}: StaggerItemProps) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${600 + index * 120}ms` }}
    >
      {children}
    </div>
  );
}

export function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
