
import prisma from "../prisma";

async function main() {
  // 1. Create a user and enroll them in two courses
  const user = await prisma.user.create({
    data: {
      firstName: "Amit",
      lastName: "Kumar",
      email: "amit@example.com",
      salary: 45000,
      courses: {
        create: [
          {
            title: "Node.js Backend Development",
            code: "NODE101"
          },
          {
            title: "Database Management",
            code: "DB101"
          }
        ]
      }
    },
    include: {
      courses: true
    }
  });

  console.log("Created User with Courses:", user);

  // 2. Find a user with all enrolled courses
  const userWithCourses = await prisma.user.findUnique({
    where: {
      email: "amit@example.com"
    },
    include: {
      courses: true
    }
  });

  console.log("User Courses:", userWithCourses);

  // 3. Find all users enrolled in a particular course
  const course = await prisma.course.findUnique({
    where: {
      code: "NODE101"
    },
    include: {
      users: true
    }
  });

  console.log("Course and Enrolled Users:", course);

  // 4. Find all courses
  const allCourses = await prisma.course.findMany({
    include: {
      users: true
    }
  });

  console.log("All Courses:", allCourses);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
