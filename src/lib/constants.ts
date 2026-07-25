import type { NewsCategory } from "./types";

export const SITE_NAME = "Nerdworking";

/** Cache-bust cuando cambies public/logo.png (sube el número). */
export const LOGO_SRC = "/logo.png?v=4";

export const NAV_LINKS = [
  { href: "/podcast", label: "Podcast" },
  { href: "/noticias", label: "Noticias" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const NEWS_CATEGORIES: Record<
  NewsCategory,
  { label: string; description: string }
> = {
  ia: { label: "Inteligencia Artificial", description: "IA y machine learning" },
  tecnologia: { label: "Tecnología", description: "Innovación y tendencias tech" },
  ciberseguridad: {
    label: "Ciberseguridad",
    description: "Seguridad digital y protección de datos",
  },
  cloud: { label: "Cloud", description: "Infraestructura y servicios en la nube" },
  datos: { label: "Datos", description: "Analytics, BI y data science" },
  "transformacion-digital": {
    label: "Transformación Digital",
    description: "Estrategia y adopción digital",
  },
  negocios: { label: "Negocios", description: "Estrategia B2B y liderazgo" },
};

export const CONTACT_TYPES = [
  { value: "cliente", label: "Quiero ser cliente B2B" },
  { value: "auspiciador", label: "Quiero auspiciar" },
  { value: "invitado", label: "Quiero ser invitado al podcast" },
  { value: "general", label: "Consulta general" },
] as const;
