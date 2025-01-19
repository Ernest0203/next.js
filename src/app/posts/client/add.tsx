"use client";

import { useState } from "react";

export interface Post {
  _id: string; // или ObjectId, если нужно
  title: string;
  content: string;
  image: string;
}

interface AddPostFormProps {
  onAdd: (post: Post) => void;
}

export default function AddPostForm({ onAdd }: AddPostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    });

    if (response.ok) {
      const newPost = await response.json();
      onAdd(newPost.post); // Добавляем новый пост в кэш
      setTitle("");
      setContent("");
      setImage("");
    } else {
      alert("Failed to add post");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <div>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}
