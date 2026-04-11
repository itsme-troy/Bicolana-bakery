import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ UPDATE category
export async function PUT(req: Request, { params }: any) {
  try {
    const body = await req.json();
    const id = parseInt(params.id);

    // ✅ Update category in database
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return Response.json(updatedCategory);
  } catch (error: any) {
  if (error.code === "P2002") {
    return Response.json(
      { error: "Category name already exists" },
      { status: 400 }
    );
  }

  return Response.json(
    { error: "Something went wrong" },
    { status: 500 }
  );
  }
}
export async function DELETE(req: Request, { params }: any) {
  try {
    const id = parseInt(params.id);

    // ✅ Delete category from database
    await prisma.category.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}