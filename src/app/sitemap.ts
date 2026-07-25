import type { MetadataRoute } from "next";
import { getServices, getSiteConfig } from "@/lib/content";

/**
 * Sitemap público. Nunca incluir /admin ni rutas de API.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, services] = await Promise.all([
    getSiteConfig(),
    getServices(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/podcast`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/noticias`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terminos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
