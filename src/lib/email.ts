import { Resend } from "resend";
import type { ContactFormData } from "./types";
import { CONTACT_TYPES } from "./constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TYPE_LABELS = Object.fromEntries(
  CONTACT_TYPES.map((t) => [t.value, t.label])
);

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ sent: boolean; error?: string }> {
  if (!resend) {
    return { sent: false, error: "RESEND_API_KEY no configurada" };
  }

  const to = process.env.CONTACT_EMAIL;
  const from =
    process.env.RESEND_FROM ?? "Nerdworking <onboarding@resend.dev>";

  if (!to) {
    return { sent: false, error: "CONTACT_EMAIL no configurada" };
  }

  const typeLabel = TYPE_LABELS[data.type] ?? data.type;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[Nerdworking] ${typeLabel}: ${data.subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; color: #171717;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #a3a3a3; margin-bottom: 24px;">
            Nuevo contacto desde nerdworking.com
          </p>
          <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">${data.subject}</h2>
          <p style="color: #737373; font-size: 14px; margin: 0 0 24px;">${typeLabel}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 100px;">Nombre</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; color: #a3a3a3;">Empresa</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
          <p style="font-size: 14px; line-height: 1.7; color: #525252; white-space: pre-wrap;">${data.message}</p>
        </div>
      `,
    });

    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { sent: false, error: message };
  }
}
