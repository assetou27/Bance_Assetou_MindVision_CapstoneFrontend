import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';

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
 * BlogPost Component
 * Displays a single blog post with full content
 * Fetches blog post data from the backend API
 */
const BlogPost: React.FC = () => {
  // Get blog post ID from URL params
  const { id } = useParams<{ id: string }>();
  
  // For redirecting after errors
  const navigate = useNavigate();
  
  // State for storing the blog post
  const [post, setPost] = useState<BlogPost | null>(null);
  
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch blog post data from the API on component mount
   */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Make API request to get specific blog post
        const response = await axios.get(`${API_URL}/blogs/${id}`);
        
        // Update state with fetched data
        setPost(response.data);
        
        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Handle and store error
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog post:', err);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Only fetch if ID is provided
    if (id) {
      fetchPost();
    } else {
      setError('No blog post ID provided');
      setLoading(false);
    }
  }, [id]);

  // Format the date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle back to blog navigation
  const handleBackToBlog = () => {
    navigate('/blog');
  };

  // Fallback blog post data in case API is not available yet
  const fallbackPost: BlogPost = {
    _id: '1',
    title: 'The Power of Mindfulness in Daily Life',
    summary: 'Discover how incorporating mindfulness practices can transform your daily experiences and improve mental well-being.',
    content: `
      <p>Mindfulness is the practice of bringing one's attention to the present moment, without judgment. It's a simple concept, but its impact on our mental and emotional well-being can be profound.</p>
      
      <h2>Why Mindfulness Matters</h2>
      <p>In our fast-paced world, we're constantly bombarded with information, notifications, and demands for our attention. This constant stimulation can leave us feeling scattered, anxious, and disconnected from ourselves and others.</p>
      
      <p>Mindfulness offers an antidote to this chaotic state. By intentionally focusing on the present moment, we can:</p>
      
      <ul>
        <li>Reduce stress and anxiety</li>
        <li>Improve focus and concentration</li>
        <li>Enhance emotional regulation</li>
        <li>Increase self-awareness</li>
        <li>Foster greater compassion for ourselves and others</li>
      </ul>
      
      <h2>Simple Mindfulness Practices for Everyday Life</h2>
      
      <h3>1. Mindful Breathing</h3>
      <p>Take a few minutes each day to sit quietly and focus solely on your breath. Notice the sensation of air flowing in and out of your body. When your mind wanders (and it will), gently bring your attention back to your breath without judgment.</p>
      
      <h3>2. Mindful Observation</h3>
      <p>Choose an object in your environment—perhaps a flower, a cloud, or even your coffee mug. Examine it closely, noticing its colors, textures, and details as if seeing it for the first time.</p>
      
      <h3>3. Mindful Listening</h3>
      <p>During conversations, practice giving your full attention to the speaker. Notice when your mind starts planning your response or gets distracted, then gently return your focus to their words.</p>
      
      <h3>4. Mindful Movement</h3>
      <p>Whether you're walking, stretching, or exercising, pay attention to the physical sensations in your body. Notice how your feet feel as they touch the ground, how your muscles extend and contract, how your breath changes with movement.</p>
      
      <h2>Incorporating Mindfulness Into Your Routine</h2>
      
      <p>You don't need to dedicate hours to formal meditation to experience the benefits of mindfulness. Small moments of awareness scattered throughout your day can make a significant difference.</p>
      
      <p>Try these simple strategies:</p>
      
      <ul>
        <li>Set reminders on your phone to take three mindful breaths</li>
        <li>Use everyday activities (like brushing your teeth or washing dishes) as mindfulness triggers</li>
        <li>Practice mindful eating by savoring each bite of your meals</li>
        <li>Take short "mindful breaks" between tasks</li>
      </ul>
      
      <h2>The Journey of Mindfulness</h2>
      
      <p>Remember that mindfulness is a practice, not a destination. Some days will feel easier than others, and your mind will inevitably wander—that's completely normal and part of the process.</p>
      
      <p>The real power of mindfulness lies not in achieving some perfect state of focus, but in the gentle returning of your attention again and again. Each time you notice your mind has wandered and you bring it back, you're strengthening your mindfulness muscle.</p>
      
      <p>As you continue on your mindfulness journey, be patient and kind with yourself. Small steps taken consistently will lead to meaningful changes in how you experience your life and connect with the world around you.</p>
    `,
    author: 'Assetou Bance',
    coverImage: '/mindfulness-blog.jpg',
    tags: ['mindfulness', 'personal growth', 'mental health'],
    createdAt: '2023-06-15T12:00:00Z',
    updatedAt: '2023-06-15T12:00:00Z'
  };

  // Use fallback data if needed (for development purposes)
  const displayPost = post || (id === '1' ? fallbackPost : null);

  return (
    <div className="blog-post-page">
      {/* Show loading state while fetching data */}
      {loading && (
        <div className="container">
          <Loading text="Loading blog post..." />
        </div>
      )}

      {/* Show error message if fetch failed */}
      {!loading && error && (
        <div className="container">
          <Alert type="error" title="Error Loading Blog Post">
            {error}
            <button 
              onClick={handleBackToBlog} 
              className="btn btn-primary mt-3"
            >
              Back to Blog
            </button>
          </Alert>
        </div>
      )}

      {/* Show message if post not found */}
      {!loading && !error && !displayPost && (
        <div className="container">
          <div className="post-not-found">
            <h2>Blog Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleBackToBlog} 
              className="btn btn-primary"
            >
              Back to Blog
            </button>
          </div>
        </div>
      )}

      {/* Display blog post content */}
      {!loading && !error && displayPost && (
        <>
          {/* Blog Post Header */}
          <section className="post-header">
            <div className="container">
              <div className="post-meta">
                <Link to="/blog" className="back-link">
                  ← Back to Blog
                </Link>
                <div className="post-tags">
                  {displayPost.tags.map(tag => (
                    <Link key={tag} to={`/blog?tag=${tag}`} className="post-tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <h1 className="post-title">{displayPost.title}</h1>
              <div className="post-info">
                <div className="post-author">By {displayPost.author}</div>
                <div className="post-date">{formatDate(displayPost.createdAt)}</div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {displayPost.coverImage && (
            <div className="post-featured-image">
              <div className="container">
                <img 
                  src={displayPost.coverImage} 
                  alt={displayPost.title} 
                  className="featured-image"
                />
              </div>
            </div>
          )}

          {/* Blog Post Content */}
          <section className="post-content">
            <div className="container">
              <div className="post-body">
                {/* Render HTML content safely */}
                <div dangerouslySetInnerHTML={{ __html: displayPost.content }} />
              </div>
            </div>
          </section>

          {/* Author Bio */}
          <section className="author-section">
            <div className="container">
              <div className="author-card">
                <div className="author-image">
                  {/* Author image placeholder - replace with actual image in production */}
                  <div className="image-placeholder">Author</div>
                </div>
                <div className="author-info">
                  <h3 className="author-name">{displayPost.author}</h3>
                  <p className="author-bio">
                    Assetou Bance is a certified life coach with over 10 years of experience helping clients 
                    achieve personal and professional growth. As the founder of MindVision Coaching, 
                    she specializes in mindfulness techniques, career development, and work-life balance strategies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts Section - Static for now */}
          <section className="related-posts">
            <div className="container">
              <h2 className="section-title">You Might Also Like</h2>
              <div className="related-posts-grid">
                <div className="related-post-card">
                  <img src="/placeholder-blog.jpg" alt="Related post" className="related-post-image" />
                  <h3 className="related-post-title">Overcoming Career Transition Anxiety</h3>
                  <Link to="/blog/2" className="read-more-link">Read More</Link>
                </div>
                <div className="related-post-card">
                  <img src="/placeholder-blog.jpg" alt="Related post" className="related-post-image" />
                  <h3 className="related-post-title">Setting Boundaries for Better Work-Life Balance</h3>
                  <Link to="/blog/3" className="read-more-link">Read More</Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default BlogPost;