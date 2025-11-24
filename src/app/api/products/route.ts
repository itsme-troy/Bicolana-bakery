import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

// =========================
// POST - Create product
// =========================

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");

  const where: any = {};

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  if (category && category !== "all") {
    where.category = { name: category };
  }

  const total = await prisma.product.count({ where });

  const items = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    include: { category: true },
    orderBy: { id: "desc" },
  });

  return NextResponse.json({
    items,
    totalPages: Math.ceil(total / limit),
  });
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
