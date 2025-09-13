import { useState, useMemo } from 'react';
import { getAllBlogPosts, categories } from '../../data/blogPosts';
import { HREF_BLOG } from '../../globals';
import ThemeToggle from '../../components/theme/ThemeToggle';
import { BlogGrid } from '../../components/blog/BlogGrid';
import { textColors } from '../../styles/colors';
import { SEO } from '../../components/SEO';

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
      <SEO title="Blog" description="Read our latest blog posts" path={HREF_BLOG} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center mx-auto">
            <h1 className={`${textColors.primary} text-4xl font-bold mb-2`}>
              Blog
            </h1>
            <p className={`${textColors.secondary} text-xl`}>
              Latest articles and updates
            </p>
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
