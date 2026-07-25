import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GridBackground } from "@/components/ui/GridBackground";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata() {
  return createPageMetadata({
    title: "Contacto Nerdworking",
    description:
      "Contacta a Nerdworking y a Manuel Vargas para ser cliente B2B, auspiciador o invitado al podcast de tecnología en Latinoamérica.",
    path: "/contacto",
    keywords: ["contacto Nerdworking", "contactar Manuel Vargas", "auspiciar Nerdworking"],
  });
}

function ContactFormFallback() {
  return (
    <div className="animate-pulse space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 bg-[var(--surface)] rounded-xl" />
      ))}
    </div>
  );
}

export default async function ContactoPage() {
  const site = await getSiteConfig();

  const contactLinks = [
    { label: "Email", href: `mailto:${site.email}`, text: site.email },
    { label: "LinkedIn", href: site.linkedin, text: site.linkedin.replace("https://", "") },
    { label: "YouTube", href: site.youtube, text: site.youtube.replace("https://", "") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Contacto", url: `${site.url}/contacto` },
        ])}
      />

      <section className="relative border-b border-[var(--border)] overflow-hidden">
        <GridBackground variant="subtle" />
        <Container className="relative py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <SectionHeading
                label="Contacto Nerdworking"
                title="Hablemos con Nerdworking"
                description="Cuéntanos tu propuesta. El equipo de Nerdworking responde consultas de clientes B2B, auspiciadores e invitados al podcast de Manuel Vargas."
              />

              <div className="space-y-4 mt-10">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-hover group"
                  >
                    <div>
                      <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-1">
                        {link.label}
                      </p>
                      <p className="text-sm text-[var(--foreground)] group-hover:text-[var(--accent-light)] transition-colors">
                        {link.text}
                      </p>
                    </div>
                    <span className="text-[var(--muted)] group-hover:text-[var(--accent-light)] transition-colors">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)] glow-accent">
                <Suspense fallback={<ContactFormFallback />}>
                  <ContactForm />
                </Suspense>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
