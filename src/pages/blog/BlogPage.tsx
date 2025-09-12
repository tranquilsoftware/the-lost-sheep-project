import { useState, useMemo } from 'react';
import { getAllBlogPosts, categories, BlogPost } from '../../data/blogPosts';
import { WEBSITE_TITLE } from '../../globals';
import ThemeToggle from '../../components/theme/ThemeToggle';
import { BlogGrid } from '../../components/blog/BlogGrid';

const BlogPage = () => {
  const allPosts = getAllBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return allPosts;
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <title>Blog | {WEBSITE_TITLE}</title>
      <meta name="description" content="Read our latest blog posts" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Latest articles and updates</p>
          </div>
          <ThemeToggle className="absolute right-8 top-8" />
        </div>

        <BlogGrid 
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredPosts={filteredPosts}
        />
      </div>
    </div>
  );
};

export default BlogPage;
