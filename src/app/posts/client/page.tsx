'use client'; 

import { useEffect, useState } from 'react';
import AddPostForm from './add';
interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
}

export default function ClientPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  let [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = Date.now()

    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data: Post[] = await response.json();
      const endTime = Date.now()
      setPosts(data);
      setRenderTime(endTime - startTime)
    }

    fetchPosts();
  }, []);

  const addPostToCache = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const result = posts.map((post) => (
    <li key={post._id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <img src={post.image} alt="" />
    </li>
  ))

  // if (result.length > 0) {
  //   const endTime = Date.now()
  //   renderTime = renderTime ? endTime -renderTime : null
  // }

  return (
    <div>
      <h1>Client-side Posts</h1>
      {renderTime && <p>Time to render: {renderTime}ms</p>}
      <AddPostForm onAdd={addPostToCache} />
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {result}
          {/* {posts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <img src={post.image} alt="" />
            </li>
          ))} */}
        </ul>
      )}
    </div>
  );
}
