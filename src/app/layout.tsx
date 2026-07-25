import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { getSiteConfig } from "@/lib/content";
import { nerdworkingJsonLd } from "@/lib/schema";
import { LOGO_SRC, OG_IMAGE } from "@/lib/constants";
import { SITE_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    title: {
      default: `${site.name} — Medio B2B de Tecnología en Latinoamérica | Manuel Vargas`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [...SITE_KEYWORDS],
    authors: [
      { name: site.founder.name, url: site.founder.linkedin },
      { name: site.name, url: site.url },
    ],
    creator: site.founder.name,
    publisher: site.name,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: site.url,
      languages: {
        es: site.url,
        "es-CL": site.url,
        "x-default": site.url,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_LA",
      alternateLocale: ["es_CL", "es_MX", "es_AR"],
      siteName: site.name,
      title: `${site.name} — Medio B2B de Tecnología | ${site.founder.name}`,
      description: site.description,
      url: site.url,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `Logo de ${site.name}, medio B2B fundado por ${site.founder.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} | ${site.founder.name}`,
      description: site.description,
      images: [OG_IMAGE],
    },
    icons: {
      icon: LOGO_SRC,
      apple: LOGO_SRC,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteConfig();

  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme','dark');try{localStorage.removeItem('theme')}catch(e){}`,
          }}
        />
        <JsonLd data={nerdworkingJsonLd(site)} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <GoogleTagManager />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
