// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// // UPDATE user
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = parseInt(params.id);
//     const body = await req.json();

//     const updated = await prisma.user.update({
//       where: { id },
//       data: {
//         name: body.name,
//         email: body.email,
//         password: body.password,
//         role: body.role,
//       },
//     });

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
//   }
// }

// // DELETE user
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = parseInt(params.id);
//     await prisma.user.delete({ where: { id } });
//     return NextResponse.json({ message: "User deleted" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
//   }
// }
