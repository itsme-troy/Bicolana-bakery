// GET /api/orders/:id
// PUT /api/orders/:id
// DELETE /api/orders/:id

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { userId, productIds } = await req.json();

//     if (!userId || !productIds || productIds.length === 0) {
//       return NextResponse.json(
//         { error: "User ID and product IDs are required" },
//         { status: 400 }
//       );
//     }

//     const order = await prisma.order.create({
//       data: {
//         userId: parseInt(userId),
//         orderProducts: {
//           create: productIds.map((pid: string) => ({
//             productId: parseInt(pid),
//           })),
//         },
//       },
//       include: {
//         user: true,
//         orderProducts: { include: { product: true } },
//       },
//     });

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }
