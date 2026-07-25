export type NewsCategory =
  | "ia"
  | "tecnologia"
  | "ciberseguridad"
  | "cloud"
  | "datos"
  | "transformacion-digital"
  | "negocios";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  image?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  icon: string;
  order: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  guest: string;
  guestRole?: string;
  publishedAt: string;
  duration?: string;
  upcoming?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  linkedin: string;
  youtube: string;
  youtubeChannelId: string;
  founder: {
    name: string;
    role: string;
    bio: string;
    email?: string;
    image?: string;
    linkedin?: string;
    /** Canales principales de Manuel Vargas (LinkedIn personal, etc.) */
    sameAs?: string[];
  };
  about: {
    history: string;
    purpose: string;
    vision: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  type: "cliente" | "auspiciador" | "invitado" | "general";
}

export interface LinkedInPost {
  id: string;
  author: string;
  authorRole: string;
  authorCompany: string;
  content: string;
  publishedAt: string;
  likes: number;
  comments: number;
  reposts: number;
  linkedinUrl: string;
  imageCaption?: string;
}

export interface LinkedInEmbed {
  id: string;
  urn: string;
  embedUrl: string;
  createdAt: string;
}
