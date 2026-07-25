interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const classes =
    variant === "accent"
      ? "bg-gradient-accent text-white"
      : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}
    >
      {children}
    </span>
  );
}
