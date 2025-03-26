import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

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
 * BlogCard props interface
 */
interface BlogCardProps {
  /** The blog post to display */
  post: BlogPost;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BlogCard Component
 * Displays a preview of a blog post in a card format
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, className = '' }) => {
  // Get default image placeholder if no image is provided
  const imageUrl = post.coverImage || '/placeholder-blog.jpg';
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Create formatted date string
  const postDate = formatDate(post.createdAt);

  // Create card footer with tags and read more link
  const cardFooter = (
    <div className="blog-card-footer">
      <div className="blog-tags">
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} className="blog-tag">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/blog/${post._id}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );

  // Create subtitle with author and date
  const subtitle = `By ${post.author} • ${postDate}`;

  return (
    <Card
      title={post.title}
      subtitle={subtitle}
      imageSrc={imageUrl}
      imageAlt={`Cover image for article: ${post.title}`}
      footer={cardFooter}
      className={`blog-card ${className}`}
      hoverable
    >
      <p className="blog-summary">{post.summary}</p>
    </Card>
  );
};

export default BlogCard;