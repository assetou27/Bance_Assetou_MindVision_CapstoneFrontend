import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import BlogCard from '../components/blog/BlogCard';

// API base URL - should match your backend
const API_URL = 'http://localhost:5000/api';

/**
 * Blog post interface defining the structure of a blog post
 */
interface BlogPost {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Blog Component
 * Displays all blog posts with filtering options
 * Fetches blog data from the backend API
 */
const Blog: React.FC = () => {
  // State for storing blog posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);
  
  // State for active tag filter
  const [activeTag, setActiveTag] = useState<string | null>(null);

  /**
   * Fetch blog posts from the API on component mount
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Make API request to get blog posts
        const response = await axios.get(`${API_URL}/blogs`);
        
        // Update state with fetched data
        setPosts(response.data);
        
        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Handle and store error
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching blog posts:', err);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchPosts();
  }, []);

  // Extract all unique tags from blog posts
  const allTags = posts.reduce((tags, post) => {
    post.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, [] as string[]);

  // Filter posts by active tag
  const filteredPosts = activeTag
    ? posts.filter(post => post.tags.includes(activeTag))
    : posts;

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  // Fallback blog posts data in case API is not available yet
  const fallbackPosts: BlogPost[] = [
    {
      _id: '1',
      title: 'The Power of Mindfulness in Daily Life',
      summary: 'Discover how incorporating mindfulness practices can transform your daily experiences and improve mental well-being.',
      content: 'Full blog post content here...',
      author: 'Assetou Bance',
      tags: ['mindfulness', 'personal growth', 'mental health'],
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z'
    },
    {
      _id: '2',
      title: 'Overcoming Career Transition Anxiety',
      summary: 'Learn strategies to navigate career changes with confidence and purpose, even when facing uncertainty.',
      content: 'Full blog post content here...',
      author: 'Assetou Bance',
      tags: ['career', 'anxiety', 'professional development'],
      createdAt: '2023-07-22T10:30:00Z',
      updatedAt: '2023-07-22T10:30:00Z'
    },
    {
      _id: '3',
      title: 'Setting Boundaries for Better Work-Life Balance',
      summary: 'Practical tips for establishing healthy boundaries that protect your time, energy, and relationships.',
      content: 'Full blog post content here...',
      author: 'Assetou Bance',
      tags: ['work-life balance', 'boundaries', 'self-care'],
      createdAt: '2023-08-10T14:15:00Z',
      updatedAt: '2023-08-10T14:15:00Z'
    }
  ];

  // Use fallback data if needed (for development purposes)
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;
  const displayFilteredPosts = activeTag
    ? displayPosts.filter(post => post.tags.includes(activeTag))
    : displayPosts;

  return (
    <div className="blog-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">MindVision Blog</h1>
          <p className="page-description">
            Insights, tips, and strategies for personal and professional growth
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content">
        <div className="container">
          <div className="blog-layout">
            {/* Tags Sidebar */}
            <div className="blog-sidebar">
              <div className="blog-tags">
                <h3 className="sidebar-title">Topics</h3>
                <ul className="tags-list">
                  <li 
                    className={`tag-item ${activeTag === null ? 'active' : ''}`}
                    onClick={() => setActiveTag(null)}
                  >
                    All Topics
                  </li>
                  {/* Use fallback tags if needed */}
                  {(allTags.length > 0 ? allTags : ['mindfulness', 'career', 'personal growth', 'work-life balance', 'mental health']).map(tag => (
                    <li 
                      key={tag}
                      className={`tag-item ${activeTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="blog-posts">
              {/* Show loading state while fetching data */}
              {loading && (
                <Loading text="Loading blog posts..." />
              )}

              {/* Show error message if fetch failed */}
              {!loading && error && (
                <Alert type="error" title="Error Loading Blog Posts">
                  {error}
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-primary mt-3"
                  >
                    Try Again
                  </button>
                </Alert>
              )}

              {/* Show message if no posts match the filter */}
              {!loading && !error && displayFilteredPosts.length === 0 && (
                <div className="no-posts">
                  <h3>No posts found</h3>
                  <p>No blog posts match your selected filter. Try another topic or check back later.</p>
                  <button 
                    onClick={() => setActiveTag(null)} 
                    className="btn btn-outline"
                  >
                    View All Posts
                  </button>
                </div>
              )}

              {/* Display blog posts */}
              {!loading && !error && displayFilteredPosts.length > 0 && (
                <div className="blog-grid">
                  {displayFilteredPosts.map(post => (
                    <BlogCard 
                      key={post._id}
                      post={post}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-description">
              Get the latest articles, tips, and resources delivered straight to your inbox.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
                required 
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;