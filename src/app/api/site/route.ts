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
    const body = (await request.json()) as SiteConfig;
    if (!body?.name || !body?.email) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }
    await saveSiteConfig(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
