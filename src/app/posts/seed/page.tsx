import clientPromise from "../../lib/mongodb";
import ClearButton from "./clearButton";

export default async function SeedPostsPage() {
  const client = await clientPromise;
  const db = client.db();
  const postsCollection = db.collection("posts");

  const seedPosts = async () => {
    try {
      const existingPosts = await postsCollection.countDocuments();
      if (existingPosts > 0) {
        return "Database already has posts. Clear it first if you want to reseed.";
      }

      const posts = Array.from({ length: 100 }, (_, i) => ({
        title: `Post #${i + 1}`,
        content: `This is the content of post number ${i + 1}.`,
        image: `https://picsum.photos/400/300?random=${i}`,
      }));

      await postsCollection.insertMany(posts);

      return "100 posts have been seeded into the database.";
    } catch (error) {
      console.error("Error seeding posts:", error);
      return "An error occurred while seeding posts.";
    }
  };

  const result = await seedPosts();

  return (
    <div>
      <h1>Seed Posts</h1>
      <p>{result}</p>
      <ClearButton />
    </div>
  );
}
