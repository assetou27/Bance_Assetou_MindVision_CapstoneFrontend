// src/pages/Blog.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Your Axios instance for backend calls
import '../styles/Blog.css';      // CSS for this page

/**
 * Interface for a single blog post as returned by your backend.
 * Adjust the fields to match your actual data (e.g., 'title', 'content', 'author').
 */
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author?: string;
}

/**
 * Blog Component
 * --------------
 * Fetches a list of blog posts from the backend (GET /api/blog)
 * and displays them in a grid of blog cards.
 */
export default function Blog() {
  // State for storing the array of blog posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  // State for capturing errors that occur during the fetch
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect Hook
   * --------------
   * Fetches blog posts once when the component mounts.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Adjust endpoint if your backend route is different
        const response = await api.get('/api/blog');
        setPosts(response.data);
      } catch (err: any) {
        setError('Failed to fetch blog posts.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <h1>Blog</h1>

      {/* If there's an error, display it */}
      {error && <p className="error">{error}</p>}

      {/* Display each blog post in a "blog-card" */}
      <div className="blog-list">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <h2>{post.title}</h2>
            {post.author && <p>by {post.author}</p>}
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
