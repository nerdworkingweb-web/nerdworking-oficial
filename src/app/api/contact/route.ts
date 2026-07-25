import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { sendContactEmail } from "@/lib/email";
import { validateEmail } from "@/lib/validation";
import type { ContactFormData } from "@/lib/types";

const ALLOWED_TYPES = new Set([
  "cliente",
  "auspiciador",
  "invitado",
  "general",
]);

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function saveContactBackup(data: ContactFormData) {
  const contactsDir = path.join(process.cwd(), "content", "contacts");
  await fs.mkdir(contactsDir, { recursive: true });
  const filename = `${Date.now()}-${data.email.replace(/[^a-z0-9]/gi, "_")}.json`;
  await fs.writeFile(
    path.join(contactsDir, filename),
    JSON.stringify({ ...data, receivedAt: new Date().toISOString() }, null, 2)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const emailResult = validateEmail(body?.email);
    if (!emailResult.ok) {
      return NextResponse.json({ error: emailResult.error }, { status: 400 });
    }

    const name = sanitizeText(body?.name, 120);
    const subject = sanitizeText(body?.subject, 200);
    const message = sanitizeText(body?.message, 5000);
    const company = sanitizeText(body?.company, 160) || undefined;
    const typeRaw = sanitizeText(body?.type, 40);
    const type = (ALLOWED_TYPES.has(typeRaw) ? typeRaw : "general") as ContactFormData["type"];

    if (!name || !subject || !message) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "El nombre es demasiado corto" },
        { status: 400 }
      );
    }

    const data: ContactFormData = {
      name,
      email: emailResult.email,
      company,
      subject,
      message,
      type,
    };

    await saveContactBackup(data);

    const { sent, error } = await sendContactEmail(data);

    if (!sent && process.env.CONTACT_EMAIL) {
      console.error("Error enviando email:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta más tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailSent: sent,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
