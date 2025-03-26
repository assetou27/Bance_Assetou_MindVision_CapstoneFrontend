import { api } from './api';
import { BlogPost } from '../types/blog.types';

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await api.get('/blog');
  return response.data;
};

// Get blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};