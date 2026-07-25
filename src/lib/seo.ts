import type { Metadata } from "next";
import { getSiteConfig } from "./content";
import { OG_IMAGE } from "./constants";

/** Keywords SEO en español — uso moderado en meta y soporte de marca. */
export const SITE_KEYWORDS = [
  "Nerdworking",
  "Manuel Vargas",
  "Manuel Vargas Nerdworking",
  "medio B2B tecnología",
  "tecnología Latinoamérica",
  "podcast tecnología LATAM",
  "CIO CTO Latinoamérica",
  "transformación digital",
  "oportunidades B2B",
  "negocios tecnología",
] as const;

export async function createPageMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
}): Promise<Metadata> {
  const site = await getSiteConfig();
  const url = `${site.url}${path}`;
  // WhatsApp/Facebook: URL absoluta, sin query string, JPG 1200×630
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${site.url}${image}`
    : `${site.url}${OG_IMAGE}`;
  const mergedKeywords = Array.from(
    new Set([...SITE_KEYWORDS, ...keywords, site.name, site.founder.name])
  );

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: [
      { name: site.founder.name, url: site.founder.linkedin },
      { name: site.name, url: site.url },
    ],
    creator: site.founder.name,
    publisher: site.name,
    category: "Tecnología",
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      languages: {
        es: url,
        "es-CL": url,
        "es-MX": url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: `${site.name} — Medio B2B de Tecnología`,
      locale: "es_LA",
      alternateLocale: ["es_CL", "es_MX", "es_AR", "es_CO"],
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `${site.name} | ${site.founder.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "LATAM",
      language: "Spanish",
    },
  };
}
