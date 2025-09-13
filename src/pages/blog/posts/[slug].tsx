import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../../../components/theme/ThemeToggle';
import BlogPost from '../BlogPost';
import { getBlogPostBySlug } from '../../../data/blogPosts';
import { BRAND_NAME, GLOBAL_META_TAGS, HREF_BLOG } from '../../../globals';
import SEO from '../../../components/SEO';
import { PostMetadata, extractFilename, parseMarkdownWithFrontmatter } from '../../../components/markdown/context/markdownParser';

const BlogPostPage = () => {

  // Import all markdown files from the public/posts directory
  const markdownModules = import.meta.glob('../../../../public/posts/*.md', { as: 'raw' });

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
  const [content, setContent] = useState(''); // THIS IS THE MARKDOWN FILE CONTENT.

  const [metadata, setMetadata] = useState<PostMetadata>({});

  useEffect(() => {
    if (!slug) {
      navigate(HREF_BLOG, { replace: true });
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
        image: postData.image || '',
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

  
  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // Extract the clean filename from the path
        const filename = extractFilename(slug || '');
        
        if (!filename) {
          throw new Error('Invalid post path');
        }

        // Debug: Log available module paths and the filename we're looking for
        console.log('Available markdown modules:', Object.keys(markdownModules));
        console.log('Looking for filename:', filename);
        
        // Find the matching markdown file
        const modulePath = Object.keys(markdownModules).find(path => {
          const pathLower = path.toLowerCase();
          const filenameLower = filename.toLowerCase();
          console.log('Checking path:', pathLower, 'for:', filenameLower);
          return pathLower.includes(filenameLower);
        });

        if (!modulePath) {
          console.error('No matching markdown file found for:', filename);
          console.error('Available paths:', Object.keys(markdownModules));
          throw new Error(`Post not found: ${filename}`);
        }

        // Import the markdown content
        const markdownContent = await markdownModules[modulePath]();
        
        // Parse markdown to extract metadata and content
        const parsedMarkdown = parseMarkdownWithFrontmatter(markdownContent);
        
        // Set the clean content (without frontmatter)
        setContent(parsedMarkdown.content);
        setMetadata(parsedMarkdown.metadata);      
        
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [slug]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"/>
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

  // Use metadata from markdown if available, otherwise fall back to blogPosts data
  const seoTitle = metadata.title || post.title;
  const seoDescription = metadata.description || post.excerpt;
  const seoImage = metadata.image || post.image;
  const seoAuthor = metadata.author || BRAND_NAME;
  const seoTags = metadata.tags || GLOBAL_META_TAGS || [];
  const seoPublishedTime = metadata.publishedDate || post.date;
  const seoModifiedTime = metadata.modifiedDate || post.date;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/blog/${slug}`}
        image={seoImage}
        article={true}
        publishedTime={seoPublishedTime}
        modifiedTime={seoModifiedTime}
        author={seoAuthor}
        tags={[...seoTags, ...GLOBAL_META_TAGS]}
      />
      
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
        
        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {seoTitle}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <time dateTime={seoPublishedTime} className="mr-4">
              {new Date(seoPublishedTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>{metadata.readTime || post.readTime}</span>
            {metadata.category && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
                  {metadata.category}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {seoImage && (
          <div className="mb-8">
            <img 
              src={seoImage} 
              alt={seoTitle}
              className="w-full h-auto aspect-[4/3] object-cover mx-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
        )}

        <article className="prose dark:prose-invert max-w-none">
          <BlogPost 
            // postPath={slug || ''} 
            // onMetadataLoad={handleMetadataLoad}

            blogPostContent={content || ''}
          />
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;