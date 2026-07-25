"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CONTACT_TYPES } from "@/lib/constants";
import { validateEmail } from "@/lib/validation";
import type { ContactFormData } from "@/lib/types";

const inputClass =
  "input-field w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const tipo = searchParams.get("tipo");
    if (tipo && CONTACT_TYPES.some((t) => t.value === tipo)) {
      setForm((prev) => ({ ...prev, type: tipo as ContactFormData["type"] }));
    }
  }, [searchParams]);

  function handleEmailChange(value: string) {
    setForm((prev) => ({ ...prev, email: value }));
    if (emailError) {
      const result = validateEmail(value);
      setEmailError(result.ok ? "" : result.error);
    }
  }

  function handleEmailBlur() {
    if (!form.email.trim()) {
      setEmailError("");
      return;
    }
    const result = validateEmail(form.email);
    setEmailError(result.ok ? "" : result.error);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const emailResult = validateEmail(form.email);
    if (!emailResult.ok) {
      setEmailError(emailResult.error);
      setStatus("idle");
      return;
    }

    setEmailError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: emailResult.email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (typeof data.error === "string" && data.error.toLowerCase().includes("email")) {
          setEmailError(data.error);
          setStatus("idle");
          return;
        }
        setServerError(
          typeof data.error === "string"
            ? data.error
            : "Hubo un error al enviar. Intenta de nuevo."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        type: "general",
      });
    } catch {
      setServerError("Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 glow-accent">
          <svg className="w-6 h-6 text-[var(--accent-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          Mensaje enviado
        </h3>
        <p className="text-[var(--muted)] text-sm">
          Te contactaremos pronto. Gracias por escribirnos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Tipo de consulta
        </label>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as ContactFormData["type"] })
          }
          className={inputClass}
        >
          {CONTACT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Nombre *
          </label>
          <input
            type="text"
            required
            maxLength={120}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            spellCheck={false}
            value={form.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "contact-email-error" : undefined}
            placeholder="nombre@empresa.com"
            className={`${inputClass} ${
              emailError
                ? "border-red-500/50 focus:border-red-400"
                : ""
            }`}
          />
          {emailError && (
            <p
              id="contact-email-error"
              className="mt-2 text-xs text-red-400"
              role="alert"
            >
              {emailError}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Empresa
        </label>
        <input
          type="text"
          maxLength={160}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Asunto *
        </label>
        <input
          type="text"
          required
          maxLength={200}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Mensaje *
        </label>
        <textarea
          required
          rows={5}
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {(status === "error" || serverError) && (
        <p className="text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
          {serverError ||
            "Hubo un error al enviar. Intenta de nuevo o escríbenos directamente."}
        </p>
      )}

      <Button type="submit" disabled={status === "loading"} size="lg">
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
