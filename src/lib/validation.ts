/**
 * Validación de email para el formulario de contacto.
 * Cubre formato básico y patrones típicos de abuso.
 */

const EMAIL_MAX_LENGTH = 254;

/** Formato RFC práctico: local@dominio.tld */
const EMAIL_FORMAT =
  /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const BLOCKED_LOCAL_PATTERNS = [
  /^\./,
  /\.$/,
  /\.\./,
];

export type EmailValidationResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

export function validateEmail(raw: unknown): EmailValidationResult {
  if (typeof raw !== "string") {
    return { ok: false, error: "Ingresa un correo electrónico válido." };
  }

  const email = raw.trim().toLowerCase();

  if (!email) {
    return { ok: false, error: "El correo electrónico es obligatorio." };
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return { ok: false, error: "El correo es demasiado largo." };
  }

  if (email.includes(" ") || email.includes("\n") || email.includes("\t")) {
    return { ok: false, error: "El correo no puede contener espacios." };
  }

  if ((email.match(/@/g) ?? []).length !== 1) {
    return {
      ok: false,
      error: "El correo debe tener un solo @ (ejemplo: nombre@empresa.com).",
    };
  }

  const [local, domain] = email.split("@");

  if (!local || !domain) {
    return { ok: false, error: "Formato de correo inválido." };
  }

  if (local.length > 64) {
    return { ok: false, error: "La parte antes del @ es demasiado larga." };
  }

  if (BLOCKED_LOCAL_PATTERNS.some((re) => re.test(local))) {
    return { ok: false, error: "Formato de correo inválido." };
  }

  if (!domain.includes(".")) {
    return {
      ok: false,
      error: "El correo debe incluir un dominio válido (ej: .com, .cl).",
    };
  }

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || !/^[a-z]+$/i.test(tld)) {
    return {
      ok: false,
      error: "El dominio del correo no es válido.",
    };
  }

  if (!EMAIL_FORMAT.test(email)) {
    return {
      ok: false,
      error: "Ingresa un correo válido, por ejemplo: nombre@empresa.com",
    };
  }

  // Caracteres peligrosos / inyección en headers
  if (/[\r\n<>'"\\]/.test(email)) {
    return { ok: false, error: "El correo contiene caracteres no permitidos." };
  }

  return { ok: true, email };
}

export function isValidEmail(raw: unknown): boolean {
  return validateEmail(raw).ok;
}
