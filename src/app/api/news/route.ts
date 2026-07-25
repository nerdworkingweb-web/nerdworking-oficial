import { NextResponse } from "next/server";
import { getNews, saveNews } from "@/lib/content";
import { verifyAdminToken } from "@/lib/auth";
import type { NewsArticle } from "@/lib/types";

export async function GET() {
  const articles = await getNews();
  return NextResponse.json(articles);
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const articles: NewsArticle[] = await request.json();
  await saveNews(articles);
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const article: NewsArticle = await request.json();
  const articles = await getNews();
  articles.unshift(article);
  await saveNews(articles);
  return NextResponse.json(article, { status: 201 });
}
