import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import {
  getLinkedInEmbeds,
  parseLinkedInEmbedInput,
  saveLinkedInEmbeds,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const embeds = await getLinkedInEmbeds();
  return NextResponse.json(embeds);
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { input?: string };
    const parsed = parseLinkedInEmbedInput(body.input ?? "");

    if (!parsed) {
      return NextResponse.json(
        {
          error:
            "No se pudo leer el post. Pega el iframe completo, la URL de embed o el URN (urn:li:share:...).",
        },
        { status: 400 }
      );
    }

    const embeds = await getLinkedInEmbeds();
    if (embeds.some((e) => e.urn === parsed.urn)) {
      return NextResponse.json(
        { error: "Ese post ya está en la lista" },
        { status: 409 }
      );
    }

    const embed = {
      id: `${Date.now()}`,
      urn: parsed.urn,
      embedUrl: parsed.embedUrl,
      createdAt: new Date().toISOString(),
    };

    embeds.unshift(embed);
    await saveLinkedInEmbeds(embeds);

    return NextResponse.json(embed, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Falta id" }, { status: 400 });
    }

    const embeds = await getLinkedInEmbeds();
    const next = embeds.filter((e) => e.id !== id);
    await saveLinkedInEmbeds(next);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
