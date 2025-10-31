import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}
