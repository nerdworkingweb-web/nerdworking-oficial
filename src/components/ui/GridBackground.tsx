interface GridBackgroundProps {
  className?: string;
  variant?: "light" | "subtle";
}

export function GridBackground({
  className = "",
  variant = "light",
}: GridBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none grid-pattern ${className}`}
      style={{ opacity: variant === "light" ? 0.4 : 0.2 }}
      aria-hidden
    />
  );
}
