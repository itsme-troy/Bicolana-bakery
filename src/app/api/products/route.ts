import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// =========================
// GET (with category + search filtering)
// =========================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        AND: [
          // CATEGORY FILTER
          category && category !== "all"
            ? { category: { name: category } }
            : {},

          // SEARCH FILTER
          search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },

      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// =========================
// POST - Create product
// =========================
export async function POST(req: Request) {
  try {
    const data = await req.json();

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
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
