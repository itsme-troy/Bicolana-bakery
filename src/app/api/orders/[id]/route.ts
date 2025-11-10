// GET /api/orders/:id
// PUT /api/orders/:id
// DELETE /api/orders/:id


import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔍 GET a single order
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(params.id) },
      include: {
        user: true,
        orderProducts: { include: { product: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// ✏️ UPDATE an order (status, products)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, products } = body;

    const updated = await prisma.order.update({
      where: { id: Number(params.id) },
      data: {
        status,
        // Optional: update products
        orderProducts: products
          ? {
              deleteMany: {}, // remove old items
              create: products.map((p: any) => ({
                product: { connect: { id: p.id } },
                quantity: p.quantity || 1,
              })),
            }
          : undefined,
      },
      include: { user: true, orderProducts: { include: { product: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// ❌ DELETE an order
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.order.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
