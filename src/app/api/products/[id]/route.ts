// e the DELETE products code into
// In Next.js, folders wrapped in square brackets represent dynamic route 
// parameters.
// So /api/products/[id]/route.ts will automatically handle requests like:
// DELETE /api/products/1
// DELETE /api/products/5

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}



// =========================
// PUT (UPDATE PRODUCT)
// =========================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const data = await req.json();

    const image =
      data.image && typeof data.image === "string" && data.image.trim() !== ""
        ? data.image
        : "/placeholder.png";

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
        price: Number(data.price),
        image, // ✅ ENFORCED DEFAULT
        categoryId: Number(data.categoryId),
        stock: data.stock !== null ? Number(data.stock) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/products/[id] ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
