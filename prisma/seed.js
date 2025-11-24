import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding categories...");

  const categories = ["Bread", "Cakes", "Pastries", "Cookies", "Specials"];

  // Create or update categories
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("🌱 Seeding products...");

  await prisma.product.createMany({
    data: [
      // --- Bread ---
      {
        name: "Classic Pandesal",
        description: "Soft and fluffy Filipino breakfast bread.",
        price: 5,
        image: "/images/pandesal.jpg",
        categoryId: 1,
      },
      {
        name: "Spanish Bread",
        description: "Sweet, buttery rolled bread.",
        price: 12,
        image: "/images/spanishbread.jpg",
        categoryId: 1,
      },
      {
        name: "Cheese Ensaymada",
        description: "Soft bun with butter, sugar, and cheese.",
        price: 45,
        image: "/images/ensaymada.jpg",
        categoryId: 1,
      },
      {
        name: "Garlic Loaf Bread",
        description: "Savory garlic loaf.",
        price: 65,
        image: "/images/garlicbread.jpg",
        categoryId: 1,
      },
      {
        name: "Whole Wheat Loaf",
        description: "Healthy whole grain loaf.",
        price: 80,
        image: "/images/wholewheat.jpg",
        categoryId: 1,
      },

      // --- Cakes ---
      {
        name: "Chocolate Moist Cake",
        description: "Rich chocolate cake.",
        price: 350,
        image: "/images/chocomoist.jpg",
        categoryId: 2,
      },
      {
        name: "Ube Cream Cake",
        description: "Fluffy ube sponge with halaya.",
        price: 420,
        image: "/images/ubecake.jpg",
        categoryId: 2,
      },
      {
        name: "Mango Graham Cake",
        description: "Layered with sweet mangoes.",
        price: 380,
        image: "/images/mango.jpg",
        categoryId: 2,
      },
      {
        name: "Black Forest Cake",
        description: "Chocolate cherry cake.",
        price: 450,
        image: "/images/blackforest.jpg",
        categoryId: 2,
      },
      {
        name: "Red Velvet Cake",
        description: "Classic red velvet with cream cheese.",
        price: 480,
        image: "/images/redvelvet.jpg",
        categoryId: 2,
      },

      // --- Pastries ---
      {
        name: "Empanada",
        description: "Savory meat-filled pastry.",
        price: 30,
        image: "/images/empanada.jpg",
        categoryId: 3,
      },
      {
        name: "Ham & Cheese Croissant",
        description: "Flaky croissant with ham.",
        price: 55,
        image: "/images/croissant.jpg",
        categoryId: 3,
      },
      {
        name: "Cinnamon Roll",
        description: "Iced cinnamon swirl roll.",
        price: 50,
        image: "/images/cinnamonroll.jpg",
        categoryId: 3,
      },
      {
        name: "Chicken Pie",
        description: "Creamy chicken-filled pastry.",
        price: 45,
        image: "/images/chickenpie.jpg",
        categoryId: 3,
      },
      {
        name: "Pizza Bread",
        description: "Soft bread with pizza toppings.",
        price: 25,
        image: "/images/pizzabread.jpg",
        categoryId: 3,
      },

      // --- Cookies ---
      {
        name: "Chocolate Chip Cookies",
        description: "Soft & chewy chocolate chip cookies.",
        price: 25,
        image: "/images/chocochip.jpg",
        categoryId: 4,
      },
      {
        name: "Oatmeal Raisin Cookies",
        description: "Healthy oatmeal raisin cookies.",
        price: 22,
        image: "/images/oatmeal.jpg",
        categoryId: 4,
      },
      {
        name: "Double Chocolate Cookies",
        description: "Rich chocolate cookies.",
        price: 28,
        image: "/images/doublechoco.jpg",
        categoryId: 4,
      },
      {
        name: "Peanut Butter Cookies",
        description: "Soft peanut butter cookies.",
        price: 20,
        image: "/images/peanutbutter.jpg",
        categoryId: 4,
      },
      {
        name: "Sugar Cookies",
        description: "Classic buttery sugar cookies.",
        price: 18,
        image: "/images/sugarcookie.jpg",
        categoryId: 4,
      },

      // --- Specials ---
      {
        name: "Ube Cheese Pandesal",
        description: "Ube pandesal with cheese.",
        price: 18,
        image: "/images/ubecheese.jpg",
        categoryId: 5,
      },
      {
        name: "Bicol Express Bun",
        description: "Spicy Bicol Express in a bun.",
        price: 35,
        image: "/images/bicolexpress.jpg",
        categoryId: 5,
      },
      {
        name: "Laing Puff",
        description: "Puff pastry filled with laing.",
        price: 40,
        image: "/images/laing.jpg",
        categoryId: 5,
      },
      {
        name: "Chili Cheese Roll",
        description: "Cheese with chili flakes.",
        price: 42,
        image: "/images/chilicheese.jpg",
        categoryId: 5,
      },
      {
        name: "Special Pili Roll",
        description: "Sweet roll with pili nuts.",
        price: 50,
        image: "/images/piliroll.jpg",
        categoryId: 5,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
