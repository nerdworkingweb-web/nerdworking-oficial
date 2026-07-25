"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type {
  LinkedInEmbed,
  Service,
  SiteConfig,
} from "@/lib/types";
import { LOGO_SRC } from "@/lib/constants";

const SESSION_KEY = "nw-admin-session";

type Tab = "noticias" | "services" | "nosotros" | "contacto";

const EMPTY_SITE: SiteConfig = {
  name: "",
  tagline: "",
  description: "",
  url: "",
  email: "",
  linkedin: "",
  youtube: "",
  youtubeChannelId: "",
  founder: {
    name: "",
    role: "",
    bio: "",
    email: "",
    linkedin: "",
    sameAs: [],
  },
  about: { history: "", purpose: "", vision: "" },
};

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<Tab>("noticias");

  const [embeds, setEmbeds] = useState<LinkedInEmbed[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [site, setSite] = useState<SiteConfig>(EMPTY_SITE);

  const [newInput, setNewInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-admin-token": token,
    }),
    [token]
  );

  const loadData = useCallback(async () => {
    const [embedsRes, servicesRes, siteRes] = await Promise.all([
      fetch("/api/linkedin-embeds", { cache: "no-store" }),
      fetch("/api/services", { cache: "no-store" }),
      fetch("/api/site", { cache: "no-store" }),
    ]);

    if (embedsRes.ok) setEmbeds(await embedsRes.json());
    if (servicesRes.ok) setServices(await servicesRes.json());
    if (siteRes.ok) setSite(await siteRes.json());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      setToken(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  function flash(ok: string, err?: string) {
    setMessage(ok);
    setError(err ?? "");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión");
        return;
      }

      localStorage.setItem(SESSION_KEY, data.token);
      setToken(data.token);
      setAuthenticated(true);
      setPassword("");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setToken("");
    setAuthenticated(false);
  }

  async function handleAddEmbed(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/linkedin-embeds", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ input: newInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo agregar");
        return;
      }
      setNewInput("");
      flash("Post agregado. Ya aparece arriba en /noticias.");
      await loadData();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEmbed(id: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/linkedin-embeds?id=${encodeURIComponent(id)}`,
        { method: "DELETE", headers: { "x-admin-token": token } }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "No se pudo eliminar");
        return;
      }
      flash("Post eliminado");
      await loadData();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  async function saveServices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(services),
      });
      flash(res.ok ? "Servicios guardados" : "", res.ok ? undefined : "Error al guardar servicios");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  async function saveSite(successMsg: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/site", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(site),
      });
      flash(res.ok ? successMsg : "", res.ok ? undefined : "Error al guardar");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "noticias", label: "Noticias" },
    { key: "services", label: "Servicios" },
    { key: "nosotros", label: "Nosotros" },
    { key: "contacto", label: "Contacto" },
  ];

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-sm text-white";
  const labelClass = "block text-xs font-medium text-neutral-400 mb-1.5";
  const cardClass =
    "rounded-2xl border border-neutral-800 bg-neutral-900 p-4 space-y-3";

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <div className="flex items-center gap-3">
            <Image
              src={LOGO_SRC}
              alt="Nerdworking"
              width={44}
              height={44}
              unoptimized
            />
            <div>
              <h1 className="text-xl font-semibold text-white">Admin</h1>
              <p className="text-xs text-neutral-400">Nerdworking</p>
            </div>
          </div>
          <input
            type="text"
            autoComplete="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-lg text-sm font-medium"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO_SRC}
              alt="Nerdworking"
              width={36}
              height={36}
              unoptimized
            />
            <div>
              <h1 className="text-lg font-semibold">Admin Nerdworking</h1>
              <p className="text-xs text-neutral-400">Gestión de contenido</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                setMessage("");
                setError("");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-violet-600 text-white"
                  : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {message && (
          <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-4 py-2 rounded-lg">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        {tab === "noticias" && (
          <div className="space-y-6">
            <form onSubmit={handleAddEmbed} className={`${cardClass}`}>
              <label className={labelClass}>Agregar post de LinkedIn</label>
              <p className="text-xs text-neutral-500 -mt-1">
                Esto es lo que se muestra en /noticias. El último agregado aparece primero.
              </p>
              <textarea
                value={newInput}
                onChange={(e) => setNewInput(e.target.value)}
                rows={4}
                placeholder="Pega el iframe, URL de embed o URN (urn:li:share:...)"
                className={inputClass}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-lg text-sm font-medium"
              >
                Agregar último post
              </button>
            </form>

            <h2 className="text-sm font-medium text-neutral-300">
              Posts ({embeds.length}) · más reciente arriba
            </h2>

            {embeds.map((embed, index) => (
              <div key={embed.id} className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-800">
                  <div className="min-w-0">
                    <p className="text-xs text-violet-300">
                      {index === 0 ? "Top en noticias" : `#${index + 1}`}
                    </p>
                    <p className="text-xs text-neutral-400 truncate font-mono">
                      {embed.urn}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteEmbed(embed.id)}
                    disabled={loading}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="p-4 flex justify-center bg-neutral-950/50">
                  <iframe
                    src={embed.embedUrl}
                    height={480}
                    width={504}
                    className="max-w-full rounded-xl border border-neutral-800"
                    frameBorder={0}
                    allowFullScreen
                    title={`LinkedIn ${embed.urn}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "services" && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-400">
              Edita todo el contenido de cada subpágina /servicios/[slug], incluyendo los bullets de beneficios.
            </p>
            {services.map((service, i) => (
              <div key={service.id} className={cardClass}>
                <p className="text-xs text-violet-300 font-mono">
                  /servicios/{service.slug}
                </p>
                <div>
                  <label className={labelClass}>Título</label>
                  <input
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...service, title: e.target.value };
                      setServices(updated);
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Descripción corta (listado + subtítulo)</label>
                  <textarea
                    value={service.shortDescription}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[i] = {
                        ...service,
                        shortDescription: e.target.value,
                      };
                      setServices(updated);
                    }}
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Descripción completa (usa línea en blanco entre párrafos)
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...service, description: e.target.value };
                      setServices(updated);
                    }}
                    rows={6}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className={labelClass + " mb-0"}>
                      Beneficios (bullets de la subpágina)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...services];
                        updated[i] = {
                          ...service,
                          benefits: [...service.benefits, ""],
                        };
                        setServices(updated);
                      }}
                      className="text-xs text-violet-300 hover:text-violet-200"
                    >
                      + Agregar bullet
                    </button>
                  </div>
                  {service.benefits.map((benefit, bi) => (
                    <div key={bi} className="flex gap-2">
                      <span className="text-neutral-500 text-sm pt-2">•</span>
                      <input
                        value={benefit}
                        onChange={(e) => {
                          const updated = [...services];
                          const benefits = [...service.benefits];
                          benefits[bi] = e.target.value;
                          updated[i] = { ...service, benefits };
                          setServices(updated);
                        }}
                        className={inputClass}
                        placeholder={`Beneficio ${bi + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...services];
                          updated[i] = {
                            ...service,
                            benefits: service.benefits.filter((_, idx) => idx !== bi),
                          };
                          setServices(updated);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 shrink-0 px-2"
                        aria-label="Eliminar beneficio"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {service.benefits.length === 0 && (
                    <p className="text-xs text-neutral-500">
                      Sin beneficios. Agrega al menos uno para que se vean en la subpágina.
                    </p>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={saveServices}
              disabled={loading}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-lg text-sm font-medium"
            >
              Guardar servicios
            </button>
          </div>
        )}

        {tab === "nosotros" && (
          <div className="space-y-4">
            <div className={cardClass}>
              <h2 className="text-sm font-semibold text-neutral-200">Sobre Nerdworking</h2>
              <div>
                <label className={labelClass}>Historia</label>
                <textarea
                  value={site.about.history}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: { ...site.about, history: e.target.value },
                    })
                  }
                  rows={4}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Propósito</label>
                <textarea
                  value={site.about.purpose}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: { ...site.about, purpose: e.target.value },
                    })
                  }
                  rows={4}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Visión</label>
                <textarea
                  value={site.about.vision}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      about: { ...site.about, vision: e.target.value },
                    })
                  }
                  rows={4}
                  className={inputClass}
                />
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-sm font-semibold text-neutral-200">Fundador</h2>
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  value={site.founder.name}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      founder: { ...site.founder, name: e.target.value },
                    })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Rol</label>
                <input
                  value={site.founder.role}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      founder: { ...site.founder, role: e.target.value },
                    })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  value={site.founder.bio}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      founder: { ...site.founder, bio: e.target.value },
                    })
                  }
                  rows={4}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn del fundador</label>
                <input
                  value={site.founder.linkedin ?? ""}
                  onChange={(e) =>
                    setSite({
                      ...site,
                      founder: { ...site.founder, linkedin: e.target.value },
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => saveSite("Nosotros guardado")}
              disabled={loading}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-lg text-sm font-medium"
            >
              Guardar nosotros
            </button>
          </div>
        )}

        {tab === "contacto" && (
          <div className="space-y-4">
            <div className={cardClass}>
              <p className="text-sm text-neutral-400">
                Links de los íconos del footer (LinkedIn, YouTube, Email) y de la
                columna izquierda de /contacto.
              </p>
              <div>
                <label className={labelClass}>YouTube (ícono footer)</label>
                <input
                  value={site.youtube}
                  onChange={(e) => setSite({ ...site, youtube: e.target.value })}
                  className={inputClass}
                  placeholder="https://youtube.com/@..."
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn (ícono footer)</label>
                <input
                  value={site.linkedin}
                  onChange={(e) => setSite({ ...site, linkedin: e.target.value })}
                  className={inputClass}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div>
                <label className={labelClass}>Correo (ícono footer + mailto)</label>
                <input
                  type="email"
                  value={site.email}
                  onChange={(e) => setSite({ ...site, email: e.target.value })}
                  className={inputClass}
                  placeholder="contacto@..."
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => saveSite("Links del footer / contacto guardados")}
              disabled={loading}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 rounded-lg text-sm font-medium"
            >
              Guardar links del footer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
