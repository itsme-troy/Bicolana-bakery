import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

// =========================
// POST - Create product
// =========================

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
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
