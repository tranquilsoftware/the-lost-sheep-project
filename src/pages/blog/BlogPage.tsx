import { Link } from 'react-router-dom';
import { getAllBlogPosts } from '../../data/blogPosts';
import { WEBSITE_TITLE } from '../../globals';
import ThemeToggle from '../../components/theme/ThemeToggle';

const BlogPage = () => {
  const posts = getAllBlogPosts();

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
            >
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
