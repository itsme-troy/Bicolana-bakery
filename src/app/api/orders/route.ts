// The /api/orders route acts as the secure middleman between your frontend 
// dashboard and your Prisma database allowing your admin to safely 
// fetch and manage order data.

// GET /api/orders → list all orders (with user + products)
// POST /api/orders → create a new order (with products)

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📦 GET all orders
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

    // Format data for frontend
    const formatted = orders.map((o) => ({
      id: o.id,
      user: o.user,
      products: o.orderProducts.map((op) => op.product),
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
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// 🧾 POST new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, products } = body;

    if (!userId || !products || products.length === 0) {
      return NextResponse.json({ error: "Missing user or products" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        status: "PENDING",
        orderProducts: {
          create: products.map((p: any) => ({
            product: { connect: { id: p.id } },
            quantity: p.quantity || 1,
          })),
        },
      },
      include: { user: true, orderProducts: { include: { product: true } } },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
