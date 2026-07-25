import { ReactNode } from "react";

interface LegalDocumentProps {
  children: ReactNode;
  lastUpdated: string;
}

export function LegalDocument({ children, lastUpdated }: LegalDocumentProps) {
  return (
    <article className="max-w-3xl mx-auto legal-content">
      <p className="text-sm text-[var(--muted)] mb-10">
        Última actualización: {lastUpdated}
      </p>
      {children}
    </article>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">{title}</h2>
      <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
