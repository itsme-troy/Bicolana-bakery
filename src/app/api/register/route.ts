import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // TODO: save to DB (Prisma) + hash password (bcrypt)
  return NextResponse.json({ ok: true });
}
