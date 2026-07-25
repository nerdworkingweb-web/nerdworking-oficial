import { NextResponse } from "next/server";
import { getSiteConfig, saveSiteConfig } from "@/lib/content";
import { verifyAdminToken } from "@/lib/auth";
import type { SiteConfig } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = await getSiteConfig();
  return NextResponse.json(site);
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<SiteConfig>;
    const current = await getSiteConfig();

    const founder = {
      ...current.founder,
      ...(body.founder ?? {}),
    };
    const linkedin = founder.linkedin?.trim();
    const sameAs = Array.from(
      new Set(
        [linkedin, ...(founder.sameAs ?? [])].filter(
          (url): url is string => Boolean(url?.trim())
        )
      )
    );

    const next: SiteConfig = {
      ...current,
      ...body,
      founder: { ...founder, sameAs },
      about: {
        ...current.about,
        ...(body.about ?? {}),
      },
    };

    if (!next.name?.trim() || !next.email?.trim()) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    await saveSiteConfig(next);
    return NextResponse.json({ success: true, site: next });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo guardar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
