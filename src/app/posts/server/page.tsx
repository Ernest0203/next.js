import { WithId, Document } from 'mongodb';
import clientPromise from "../../lib/mongodb";

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default async function ServerPostsPage() {
  const client = await clientPromise;
  const db = client.db();
  const postsCollection = db.collection('posts');

  const posts: WithId<Document>[] = await postsCollection.find({}).toArray();

  const typedPosts: Post[] = posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
  }));

  return (
    <div>
      <h1>Server-side Posts</h1>
      {typedPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {typedPosts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
