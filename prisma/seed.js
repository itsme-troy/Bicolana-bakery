import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = ["Bread", "Pastries", "Cakes", "Drinks"];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
