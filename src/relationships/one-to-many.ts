import prisma from "../prisma";

async function main() {
  // 1. Create a user with two posts
  const user = await prisma.user.create({
    data: {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@example.com",
      salary: 50000,
      posts: {
        create: [
          {
            title: "Learning Prisma ORM",
            content: "Understanding Prisma relationships",
            published: true,
          },
          {
            title: "Learning PostgreSQL",
            content: "Practicing advanced SQL",
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  console.log("Created User with Posts:", user);

  // 2. Find a user and their posts
  const foundUser = await prisma.user.findUnique({
    where: { email: "rahul@example.com" },
    include: { posts: true },
  });

  console.log("User with Posts:", foundUser);

  // 3. Find all posts belonging to this user
  const posts = await prisma.post.findMany({
    where: { userId: user.id },
  });

  console.log("User Posts:", posts);

  // 4. Find posts along with their authors
  const allPosts = await prisma.post.findMany({
    include: { user: true },
  });

  console.log("Posts with Authors:", allPosts);

  // 5. Update the first post
  const updatedPost = await prisma.post.update({
    where: { id: user.posts[0].id },
    data: { published: true },
  });

  console.log("Updated Post:", updatedPost);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });