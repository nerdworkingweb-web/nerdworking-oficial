import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { getSiteConfig } from "@/lib/content";

export async function Footer() {
  const site = await getSiteConfig();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--card)] mt-auto overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Container className="relative py-16">
        <div className="text-center mb-12">
          <BrandLogo size={72} className="justify-center" />
          <p className="mt-4 text-sm text-[var(--muted)] max-w-md mx-auto">
            {site.tagline}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent-light)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {site.linkedin ? (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent)] transition-all card-hover"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          ) : null}
          {site.youtube ? (
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent)] transition-all card-hover"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          ) : null}
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent-light)] hover:border-[var(--accent)] transition-all card-hover"
              aria-label="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          ) : null}
        </div>

        <div className="hr-gradient mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {SITE_NAME}. Fundado por Manuel Vargas.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
            <Link href="/privacidad" className="hover:text-[var(--accent-light)] transition-colors">
              Privacidad
            </Link>
            <span>·</span>
            <Link href="/terminos" className="hover:text-[var(--accent-light)] transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
