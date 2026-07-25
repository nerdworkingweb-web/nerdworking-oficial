import { NextResponse } from "next/server";
import { getServices, saveServices } from "@/lib/content";
import { verifyAdminToken } from "@/lib/auth";
import type { Service } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const services: Service[] = await request.json();
    const cleaned = services.map((service) => ({
      ...service,
      benefits: (service.benefits ?? [])
        .map((b) => b.trim())
        .filter(Boolean),
    }));
    await saveServices(cleaned);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo guardar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
