
import prisma from "./prisma";

async function main() {
  try {
    await prisma.$connect();

    console.log("PostgreSQL connected successfully!");

    const users = await prisma.user.findMany();

    console.log("Users:", users);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
