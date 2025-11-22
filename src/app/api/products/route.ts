import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

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
      if (!data.categoryId) {
  return NextResponse.json(
    { error: "Category is required" },
    { status: 400 }
  );
}
        
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
