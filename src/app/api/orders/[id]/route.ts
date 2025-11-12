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
