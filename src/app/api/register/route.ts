// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
// import { db } from "@/lib/db"; // <-- Import your database client (e.g., Prisma)

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    // const existingUser = await db.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   return NextResponse.json(
    //     { message: "Email already in use." },
    //     { status: 409 }
    //   );
    // }

    // ⚠️ Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user in your database
    // const user = await db.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //   },
    // });

    // For this example, we'll just log it.
    // Replace this with your actual database code.
    console.log("Creating user:", { name, email, hashedPassword });

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}