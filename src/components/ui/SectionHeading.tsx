interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "";

  return (
    <div className={`max-w-2xl mb-12 flex flex-col ${alignClass}`}>
      {label && (
        <div
          className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-[var(--accent)]" />
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--accent-light)]">
            {label}
          </p>
          {align === "center" && (
            <span className="h-px w-8 bg-[var(--accent)]" />
          )}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base text-[var(--muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
