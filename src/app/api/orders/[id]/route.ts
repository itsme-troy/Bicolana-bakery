// // GET /api/orders/:id
// // PUT /api/orders/:id
// // DELETE /api/orders/:id
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ DELETE order (Next.js 15+ syntax)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  // ⬇️ Await the params before using them
  const { id } = await context.params;

  try {
    // Delete related orderProducts first
    await prisma.orderProduct.deleteMany({
      where: { orderId: parseInt(id) },
    });

    // Then delete the order itself
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}


// ✅ UPDATE order
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { userId, items, status } = await req.json();

    // ✅ validate input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "User ID and at least one item are required." },
        { status: 400 }
      );
    }

    // ✅ remove old products first (important for update)
    await prisma.orderProduct.deleteMany({
      where: { orderId: parseInt(id) },
    });

    // ✅ update order + recreate items
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        userId: parseInt(userId),
        status,
        orderProducts: {
          create: items.map((item: any) => ({
            productId: parseInt(item.productId),
            quantity: item.quantity || 1,
          })),
        },
      },
      include: {
        user: true,
        orderProducts: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}