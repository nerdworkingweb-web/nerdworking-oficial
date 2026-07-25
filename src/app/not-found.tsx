import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-16">
      <Image
        src="/404.png"
        alt="404 — Lo que buscas no está aquí. Probemos con otra ruta."
        width={960}
        height={720}
        priority
        className="w-full max-w-2xl h-auto object-contain"
      />
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors"
      >
        Volver al inicio →
      </Link>
    </div>
  );
}
