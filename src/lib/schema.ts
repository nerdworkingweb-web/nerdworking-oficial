import type { NewsArticle, PodcastEpisode, Service, SiteConfig } from "./types";
import { LOGO_SRC } from "./constants";

function absoluteLogo(site: SiteConfig) {
  return `${site.url}${LOGO_SRC.split("?")[0]}`;
}

/** YouTube canónico de Nerdworking (nunca un canal personal). */
export function nerdworkingYouTubeUrl(site: SiteConfig): string {
  if (site.youtubeChannelId) {
    return `https://www.youtube.com/channel/${site.youtubeChannelId}`;
  }
  return site.youtube || "https://www.youtube.com/@nerdworking";
}

/** Canales principales de Manuel Vargas (Person.sameAs). */
export function manuelVargasChannels(site: SiteConfig): string[] {
  const channels = [
    ...(site.founder.sameAs ?? []),
    site.founder.linkedin,
  ].filter(Boolean) as string[];

  return Array.from(new Set(channels));
}

/** Canales de la marca Nerdworking (Organization.sameAs). YouTube = siempre Nerdworking. */
export function nerdworkingBrandChannels(site: SiteConfig): string[] {
  return Array.from(
    new Set(
      [site.linkedin, nerdworkingYouTubeUrl(site), site.youtube].filter(Boolean)
    )
  );
}

export function organizationId(site: SiteConfig) {
  return `${site.url}/#organization`;
}

export function personId(site: SiteConfig) {
  return `${site.url}/#person`;
}

export function websiteId(site: SiteConfig) {
  return `${site.url}/#website`;
}

export function podcastSeriesId(site: SiteConfig) {
  return `${site.url}/podcast#series`;
}

/**
 * JSON-LD global de Nerdworking para todas las páginas.
 * Person (Manuel Vargas) prioriza sus canales; YouTube es siempre el de Nerdworking.
 */
export function nerdworkingJsonLd(site: SiteConfig) {
  const orgId = organizationId(site);
  const founderId = personId(site);
  const webId = websiteId(site);
  const seriesId = podcastSeriesId(site);
  const logo = absoluteLogo(site);
  const youtube = nerdworkingYouTubeUrl(site);
  const manuelChannels = manuelVargasChannels(site);
  const brandChannels = nerdworkingBrandChannels(site);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "NewsMediaOrganization"],
        "@id": orgId,
        name: site.name,
        alternateName: ["Nerdworking LATAM", "Nerdworking Media"],
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
        image: logo,
        description: site.description,
        email: site.email,
        foundingDate: "2020",
        slogan: site.tagline,
        areaServed: {
          "@type": "Place",
          name: "Latinoamérica",
        },
        knowsAbout: [
          "Tecnología B2B",
          "Negocios",
          "Podcast corporativo",
          "Transformación digital",
          "CIO",
          "CTO",
          "Latinoamérica",
        ],
        sameAs: brandChannels,
        founder: { "@id": founderId },
        employee: { "@id": founderId },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.email,
            availableLanguage: ["Spanish", "es"],
          },
        ],
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: site.founder.name,
        givenName: "Manuel",
        familyName: "Vargas",
        jobTitle: site.founder.role,
        description: site.founder.bio,
        url: site.founder.linkedin || site.url,
        image: logo,
        email: site.founder.email,
        nationality: {
          "@type": "Country",
          name: "Chile",
        },
        worksFor: { "@id": orgId },
        founder: { "@id": orgId },
        sameAs: manuelChannels,
        knowsAbout: [
          "Nerdworking",
          "Tecnología B2B",
          "Transformación digital",
          "Medios digitales",
          "Podcast",
          "Latinoamérica",
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${site.url}/nosotros`,
        },
      },
      {
        "@type": "WebSite",
        "@id": webId,
        name: site.name,
        alternateName: "Nerdworking — Medio B2B de Tecnología",
        url: site.url,
        description: site.description,
        inLanguage: ["es", "es-419", "es-CL"],
        publisher: { "@id": orgId },
        author: { "@id": founderId },
        copyrightHolder: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/noticias?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "PodcastSeries",
        "@id": seriesId,
        name: `Podcast ${site.name}`,
        alternateName: `Podcast de ${site.founder.name} — Nerdworking`,
        description: `Podcast de Nerdworking con ${site.founder.name}: conversaciones con CIOs, CTOs y líderes de tecnología en Latinoamérica.`,
        url: `${site.url}/podcast`,
        inLanguage: "es",
        author: { "@id": founderId },
        publisher: { "@id": orgId },
        webFeed: youtube,
        sameAs: [youtube],
      },
    ],
  };
}

/** @deprecated Prefer nerdworkingJsonLd — se mantiene por compatibilidad en páginas. */
export function personSchema(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(site),
    name: site.founder.name,
    jobTitle: site.founder.role,
    description: site.founder.bio,
    url: site.founder.linkedin || site.url,
    email: site.founder.email,
    image: absoluteLogo(site),
    worksFor: {
      "@id": organizationId(site),
    },
    sameAs: manuelVargasChannels(site),
    knowsAbout: [
      "Tecnología B2B",
      "Transformación digital",
      "Medios digitales",
      "Podcast",
      "Latinoamérica",
      "Nerdworking",
    ],
  };
}

/** @deprecated Prefer nerdworkingJsonLd */
export function organizationSchema(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(site),
    name: site.name,
    url: site.url,
    logo: absoluteLogo(site),
    description: site.description,
    email: site.email,
    sameAs: nerdworkingBrandChannels(site),
    founder: { "@id": personId(site) },
  };
}

/** @deprecated Prefer nerdworkingJsonLd */
export function websiteSchema(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(site),
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: ["es", "es-CL", "es-419"],
    publisher: { "@id": organizationId(site) },
    author: { "@id": personId(site) },
  };
}

export function articleSchema(article: NewsArticle, site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    inLanguage: "es",
    author: { "@id": personId(site) },
    publisher: { "@id": organizationId(site) },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/noticias/${article.slug}`,
    },
    isPartOf: { "@id": websiteId(site) },
    ...(article.image && { image: article.image }),
  };
}

export function serviceSchema(service: Service, site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} | ${site.name}`,
    description: `${service.shortDescription} Servicio de ${site.name}, medio B2B de tecnología en Latinoamérica fundado por ${site.founder.name}.`,
    provider: { "@id": organizationId(site) },
    areaServed: "Latinoamérica",
    url: `${site.url}/servicios/${service.slug}`,
    inLanguage: "es",
  };
}

export function podcastEpisodeSchema(episode: PodcastEpisode, site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    datePublished: episode.publishedAt,
    inLanguage: "es",
    partOfSeries: { "@id": podcastSeriesId(site) },
    author: { "@id": personId(site) },
    publisher: { "@id": organizationId(site) },
    ...(episode.youtubeId && {
      associatedMedia: {
        "@type": "VideoObject",
        name: episode.title,
        embedUrl: `https://www.youtube.com/embed/${episode.youtubeId}`,
      },
    }),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
