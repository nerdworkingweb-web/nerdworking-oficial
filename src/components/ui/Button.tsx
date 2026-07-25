import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "outline-light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-accent text-white border border-transparent hover:opacity-90 glow-accent hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-transparent",
  inverse: "btn-inverse hover:-translate-y-0.5",
  "outline-light": "btn-outline-light hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3 text-base rounded-xl",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium transition-all duration-300 ease-out ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
