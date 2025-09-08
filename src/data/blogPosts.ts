export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
  category: string;
  tagline?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My First Blog Post',
    excerpt: 'This is a sample blog post excerpt.',
    readTime: '5 min read',
    date: '2023-01-01',
    image: 'https://via.placeholder.com/150',
    slug: 'my-first-post',
    category: 'Technology',
    tagline: 'Exploring the future of technology'
  }
];

// Helper function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPosts];
};

// Get all unique categories from blog posts
export const categories = Array.from(
  new Set(blogPosts.map(post => post.category))
).sort();

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
