
import prisma from "../prisma";

async function main() {

  // 1. Find users with a specific first name
  const usersByName = await prisma.user.findMany({
    where: {
      firstName: "Mohit"
    }
  });

  console.log("Users by name:", usersByName);


  // 2. Find users earning more than 40000
  const highSalaryUsers = await prisma.user.findMany({
    where: {
      salary: {
        gt: 40000
      }
    }
  });

  console.log("High salary users:", highSalaryUsers);


  // 3. Find users older than or equal to 21
  const adultUsers = await prisma.user.findMany({
    where: {
      age: {
        gte: 21
      }
    }
  });

  console.log("Adult users:", adultUsers);


  // 4. Find active users
  const activeUsers = await prisma.user.findMany({
    where: {
      isActive: true
    }
  });

  console.log("Active users:", activeUsers);


  // 5. Search names containing a keyword
  const searchedUsers = await prisma.user.findMany({
    where: {
      firstName: {
        contains: "Mo",
        mode: "insensitive"
      }
    }
  });

  console.log("Searched users:", searchedUsers);


// AND: Both conditions must be true
const andUsers = await prisma.user.findMany({
  where: {
    AND: [
      { isActive: true },
      { salary: { gt: 30000 } }
    ]
  }
});

console.log("AND results:", andUsers);


// OR: At least one condition must be true
const orUsers = await prisma.user.findMany({
  where: {
    OR: [
      { firstName: "Mohit" },
      { firstName: "Rahul" }
    ]
  }
});

console.log("OR results:", orUsers);


// NOT: Exclude matching conditions
const notUsers = await prisma.user.findMany({
  where: {
    NOT: {
      isActive: false
    }
  }
});

console.log("NOT results:", notUsers);


}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
