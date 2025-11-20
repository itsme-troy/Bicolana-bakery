// The /api/orders route acts as the secure middleman between your frontend 
// dashboard and your Prisma database allowing your admin to safely 
// fetch and manage order data.

// GET /api/orders → list all orders (with user + products)
// POST /api/orders → create a new order (with products)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ CREATE new order
export async function POST(req: Request) {
  try {
    const { userId, productIds, status } = await req.json();

    if (!userId || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "User ID and at least one product ID are required." },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        status: status || "pending",
        orderProducts: {
          create: productIds.map((pid: string) => ({
            productId: parseInt(pid),
            quantity: 1,
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

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// ✅ GET all orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        include: {
          user: true,
          orderProducts: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),

      prisma.order.count(),
    ]);

    const formatted = orders.map((o) => ({
      id: o.id,
      userId: o.userId,
      user: o.user,
      products: o.orderProducts.map((op) => ({
        id: op.product.id,
        name: op.product.name,
        price: op.product.price,
        quantity: op.quantity,
      })),
      total: o.orderProducts.reduce(
        (sum, op) => sum + op.product.price * op.quantity,
        0
      ),
      status: o.status,
      createdAt: o.createdAt,
    }));

    return NextResponse.json({
      orders: formatted,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { orders: [], total: 0, page: 1, totalPages: 1 },
      { status: 200 }
    );
  }
}
