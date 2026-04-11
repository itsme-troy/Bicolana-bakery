// ✅ Import Prisma Client
import { PrismaClient } from "@prisma/client";

// ✅ Create Prisma instance (handles DB connection)
const prisma = new PrismaClient();

// ✅ GET all categories from database
export async function GET() {
  try {
    // 🔥 Fetch all categories from DB
    const categories = await prisma.category.findMany({
      // Optional: sort by newest first
      orderBy: {
        createdAt: "desc",
      },

      // Optional: include related products count
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    // ✅ Return categories as JSON response
    return Response.json(categories);

  } catch (error) {
    console.error(error);

    //  Handle errors properly
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // ✅ Get request body
    const body = await req.json();

    // 🔥 Create category in DB
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
    });

    // ✅ Return created category
    return Response.json(newCategory);

  } catch (error: any) {
    console.error(error);

    //  Handle duplicate category name (unique constraint)
    if (error.code === "P2002") {
      return Response.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}