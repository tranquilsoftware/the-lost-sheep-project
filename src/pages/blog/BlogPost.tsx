import React from 'react';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer';

interface BlogPostProps {
  blogPostContent: string; // THE MARKDOWN FILE CONTENT THAT IS EXTRACTED AND PARSED IN. (using extractFilename in markdownParser)
}

const BlogPost: React.FC<BlogPostProps> = ({ blogPostContent }) => {

  return <MarkdownRenderer
    content={blogPostContent}
    contentAlignment="left"
    headingAlignment="left"
    showToc={true}
  />;
};

export default BlogPost;