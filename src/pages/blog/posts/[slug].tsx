import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../../../components/theme/ThemeToggle';
import BlogPost from '../BlogPost';
import { getBlogPostBySlug } from '../../../data/blogPosts';
import { WEBSITE_TITLE } from '../../../globals';


const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<{
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
  } | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/blog', { replace: true });
      return;
    }

    try {
      const postData = getBlogPostBySlug(slug);
      
      if (!postData) {
        throw new Error('Post not found');
      }
      
      setPost({
        title: postData.title,
        excerpt: postData.excerpt,
        image: postData.image,
        date: postData.date,
        readTime: postData.readTime
      });
      setError(null);
      
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load the blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <title>{`${post.title} | ${WEBSITE_TITLE}`}</title>
      <meta name="description" content={post.excerpt} />
      {post.image && <meta property="og:image" content={post.image} />}
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </button>
          <ThemeToggle />
        </div>
        <article>
          {/* <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <time dateTime={post.date} className="mr-4">
                {post.date}
              </time>
              <span>{post.readTime}</span>
            </div>
          </header> */}
          
          <div className="prose dark:prose-invert max-w-none">
            <BlogPost postPath={slug || ''} />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;