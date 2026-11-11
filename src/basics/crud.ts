
import prisma from "../prisma";

async function main() {

  // CREATE: Insert a new user

  const newUser = await prisma.user.create({
    data: {
      firstName: "Mohit",
      lastName: "Singh",
      email: "mohit@example.com",
      phone: "9876543210",
      age: 24,
      salary: 45000,
      bio: "MCA Student"
    }
  });

  console.log("Created User:", newUser);

// READ: Find all users
const users = await prisma.user.findMany();
console.log("All Users:", users);

// Find user by unique email
const user = await prisma.user.findUnique({
  where: {
    email: "mohit@example.com"
  }
});
console.log("Single User:", user);

// UPDATE: Change user information
const updatedUser = await prisma.user.update({
  where: {
    email: "mohit@example.com"
  },
  data: {
    salary: 55000,
    bio: "Backend Developer Learner"
  }
});
console.log("Updated User:", updatedUser);

// DELETE: Remove a user
const deletedUser = await prisma.user.delete({
  where: {
    email: "mohit@example.com"
  }
});
console.log("Deleted User:", deletedUser);

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
