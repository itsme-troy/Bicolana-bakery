import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

// =========================
// POST - Create product
// =========================
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");

  const where: any = {};

  // 🔍 Search filter
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // 🟢 Category filter (IMPORTANT FIX)
  if (category && category !== "all") {
    where.categoryId = Number(category);
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(products);
}



export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.categoryId) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image: data.image,
        categoryId: Number(data.categoryId),
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("POST /api/products ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
