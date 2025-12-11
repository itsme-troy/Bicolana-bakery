// app/api/categories/route.ts  (Next 13 route handler style)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your prisma client

export async function GET() {
  const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(cats);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  const created = await prisma.category.create({ data: { name: name.trim() } });
  return NextResponse.json(created, { status: 201 });
}
