# Nerdworking

Sitio web B2B de tecnología para Latinoamérica. Construido con Next.js, API Routes y un diseño minimalista orientado a ejecutivos (CIOs, CTOs, CDOs).

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
content/           # Contenido editable (noticias, servicios, podcast, sitio)
src/app/(main)/    # Páginas públicas
src/app/admin/     # Panel de administración
src/app/api/       # API Routes
src/components/    # Componentes UI
src/lib/           # Utilidades, SEO, schema.org
src/i18n/          # Config i18n (preparado para inglés)
```

## Secciones

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con hero, noticias, podcast y servicios |
| `/podcast` | Episodios, invitados y próximos capítulos |
| `/noticias` | Noticias con categorías y buscador |
| `/servicios` | Servicios B2B con páginas individuales |
| `/nosotros` | Historia, propósito, visión y fundador |
| `/contacto` | Formulario de contacto |

## Administración

Panel en `/admin` protegido con token.

1. Define `ADMIN_SECRET` en `.env.local`
2. Ingresa el token en el panel
3. Edita noticias, servicios y podcast

Para edición avanzada, modifica directamente los archivos JSON en `content/`.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `ADMIN_SECRET` | Token del panel admin |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |
| `YOUTUBE_API_KEY` | API de YouTube para videos automáticos |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) para envío de emails |
| `CONTACT_EMAIL` | Bandeja donde llegan los mensajes del formulario |
| `RESEND_FROM` | Remitente del email (requiere dominio verificado) |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio en producción |

## Formulario de contacto

Flujo profesional recomendado:

```
Visitante → Formulario → API Route → Resend → contacto@nerdworking.com
                              ↓
                     Backup JSON (content/contacts/)
```

1. Crea cuenta en [resend.com](https://resend.com) (100 emails/día gratis)
2. Verifica tu dominio (`nerdworking.com`) en Resend
3. Configura las variables en `.env.local`:
   - `RESEND_API_KEY` — desde el dashboard de Resend
   - `CONTACT_EMAIL` — tu correo de recepción
   - `RESEND_FROM` — ej. `Nerdworking <contacto@nerdworking.com>`

Sin Resend configurado, el formulario sigue guardando mensajes en `content/contacts/` como respaldo.

Configura `youtubeChannelId` en `content/site.json` para integración con YouTube.

## SEO

- Meta títulos y descripciones por página
- Schema.org (Organization, WebSite, NewsArticle, Service, PodcastEpisode)
- Sitemap automático en `/sitemap.xml`
- Robots en `/robots.txt`
- URLs amigables
- Preparado para Search Console

## Despliegue

Compatible con Vercel, Netlify o cualquier hosting Node.js:

```bash
npm run build
npm start
```

## Próximos pasos sugeridos

- Conectar CMS headless (Sanity, Contentful) reemplazando JSON
- Integrar envío de emails en formulario de contacto (Resend) — ya implementado, ver sección Formulario de contacto
- Agregar inglés con next-intl
- Configurar dominio y Search Console
- Reemplazar IDs de YouTube de ejemplo con videos reales
