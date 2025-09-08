import React, { useState, useEffect } from 'react';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer';

// Import all markdown files from the public/posts directory
const markdownModules = import.meta.glob('../../../public/posts/*.md', { as: 'raw' });

/**
 * Extracts the clean filename from a path
 * @param path - The full path or filename
 * @returns The clean filename without path or extension
 */
const extractFilename = (path: string): string => {
  return path
    .split('/')
    .pop()
    ?.replace(/\.md$/i, '') || '';
};

interface BlogPostProps {
  postPath: string; // The slug of the post (e.g., 'my-first-blog-post')
}

const BlogPost: React.FC<BlogPostProps> = ({ postPath }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // Extract the clean filename from the path
        const filename = extractFilename(postPath);
        
        if (!filename) {
          throw new Error('Invalid post path');
        }

        // Debug: Log available module paths and the filename we're looking for
        // console.log('Available markdown modules:', Object.keys(markdownModules));
        // console.log('Looking for filename:', filename);
        
        // Find the matching markdown file
        const modulePath = Object.keys(markdownModules).find(path => {
          const pathLower = path.toLowerCase();
          const filenameLower = filename.toLowerCase();
          console.log('Checking path:', pathLower, 'for:', filenameLower);
          return pathLower.includes(filenameLower);
        });

        if (!modulePath) {
          console.error('No matching markdown file found for:', filename);
          // console.error('Available paths:', Object.keys(markdownModules));
          throw new Error(`Post not found: ${filename}`);
        }

        // Import the markdown content
        const markdownContent = await markdownModules[modulePath]();
        setContent(markdownContent);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, [postPath]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <MarkdownRenderer
    content={content}
    contentAlignment="left"
    headingAlignment="left"
    showToc={true}
  />;
};

export default BlogPost;