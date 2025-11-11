// The /api/orders route acts as the secure middleman between your frontend 
// dashboard and your Prisma database allowing your admin to safely 
// fetch and manage order data.

// GET /api/orders → list all orders (with user + products)
// POST /api/orders → create a new order (with products)

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // ✅ Format response for the frontend
    const formatted = orders.map((o) => ({
      id: o.id,
      user: o.user,
      products: o.orderProducts.map((op) => ({
        ...op.product,
        quantity: op.quantity,
      })),
      total: o.orderProducts.reduce(
        (sum, op) => sum + op.product.price * op.quantity,
        0
      ),
      status: o.status,
      createdAt: o.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, productIds } = await req.json();

    if (!userId || !productIds || productIds.length === 0) {
      return NextResponse.json(
        { error: "User ID and at least one product ID are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
    userId: parseInt(userId),
        orderProducts: {
          create: productIds.map((pid: string) => ({
            productId: parseInt(pid),
            quantity: 1, // ✅ default quantity
          })),
        },
      },
      include: {
        user: true,
        orderProducts: { include: { product: true } },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
