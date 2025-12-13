import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding categories...");

  const categoryNames = [
    "Bread",
    "Cakes",
    "Pastries",
    "Cookies",
    "Specials",
  ];

  // Create categories (id-safe)
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Fetch categories with IDs
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.name, c.id])
  );

  console.log("🌱 Seeding products...");

  await prisma.product.createMany({
    data: [
      // --- Bread ---
      {
        name: "Classic Pandesal",
        description: "Soft and fluffy Filipino breakfast bread.",
        price: 5,
        stock: 50,
        image: "/images/pandesal.jpg",
        categoryId: categoryMap["Bread"],
      },
      {
        name: "Spanish Bread",
        description: "Sweet, buttery rolled bread.",
        price: 12,
        stock: 40,
        image: "/images/spanishbread.jpg",
        categoryId: categoryMap["Bread"],
      },

      // --- Cakes ---
      {
        name: "Chocolate Moist Cake",
        description: "Rich chocolate cake.",
        price: 350,
        stock: 12,
        image: "/images/chocomoist.jpg",
        categoryId: categoryMap["Cakes"],
      },
      {
        name: "Ube Cream Cake",
        description: "Fluffy ube sponge with halaya.",
        price: 420,
        stock: 8,
        image: "/images/ubecake.jpg",
        categoryId: categoryMap["Cakes"],
      },

      // --- Pastries ---
      {
        name: "Ham & Cheese Croissant",
        description: "Flaky croissant with ham.",
        price: 55,
        stock: 0,
        image: "/images/croissant.jpg",
        categoryId: categoryMap["Pastries"],
      },

      // --- Cookies ---
      {
        name: "Chocolate Chip Cookies",
        description: "Soft & chewy chocolate chip cookies.",
        price: 25,
        stock: 5,
        image: "/images/chocochip.jpg",
        categoryId: categoryMap["Cookies"],
      },

      // --- Specials ---
      {
        name: "Ube Cheese Pandesal",
        description: "Ube pandesal with cheese.",
        price: 18,
        stock: 30,
        image: "/images/ubecheese.jpg",
        categoryId: categoryMap["Specials"],
      },
    ],
  });

  console.log("✅ Seeding complete");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
