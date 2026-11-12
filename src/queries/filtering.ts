
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


// =====================================
// 3. SORTING WITH ORDERBY
// =====================================

const sortedUsers = await prisma.user.findMany({
  orderBy: {
    salary: "desc"
  }
});

console.log("Sorted users:", sortedUsers);


// Sort by multiple fields
const multiSortedUsers = await prisma.user.findMany({
  orderBy: [
    { salary: "desc" },
    { firstName: "asc" }
  ]
});

console.log("Multi-sorted users:", multiSortedUsers);


// =====================================
// 4. PAGINATION
// =====================================

const page1 = await prisma.user.findMany({
  skip: 0,
  take: 10
});

console.log("Page 1:", page1);


const page2 = await prisma.user.findMany({
  skip: 10,
  take: 10
});

console.log("Page 2:", page2);


// =====================================
// 5. SELECT SPECIFIC FIELDS
// =====================================

const selectedUsers = await prisma.user.findMany({
  select: {
    id: true,
    firstName: true,
    email: true
  }
});

console.log("Selected users:", selectedUsers);


}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
