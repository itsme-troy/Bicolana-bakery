// e the DELETE products code into
// In Next.js, folders wrapped in square brackets represent dynamic route 
// parameters.
// So /api/products/[id]/route.ts will automatically handle requests like:
// DELETE /api/products/1
// DELETE /api/products/5

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const { id } = params;
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image: data.image,
        categoryId: Number(data.categoryId), // 👈 required
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
