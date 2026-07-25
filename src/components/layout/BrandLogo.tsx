import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC, SITE_NAME } from "@/lib/constants";

interface BrandLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  size = 40,
  showWordmark = false,
  className = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={SITE_NAME}
    >
      <Image
        src={LOGO_SRC}
        alt="Logo de Nerdworking, medio B2B de tecnología en Latinoamérica fundado por Manuel Vargas"
        width={size}
        height={size}
        priority={priority}
        unoptimized
        className="object-contain"
      />
      {showWordmark && (
        <span className="text-lg font-bold tracking-tight text-gradient">
          {SITE_NAME}
        </span>
      )}
    </Link>
  );
}
