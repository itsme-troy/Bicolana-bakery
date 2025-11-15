import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// (handles GET and POST for products)
const prisma = new PrismaClient();


// GET all products (with category)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([], { status: 500 }); // ALWAYS return array
  }
}


// CREATE product
export async function POST(req: Request) {
  try {np
    const data = await req.json();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image: data.image,
        categoryId: Number(data.categoryId), // ⬅ REQUIRED NOW
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
