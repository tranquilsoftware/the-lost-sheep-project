import React from 'react';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer';
import ReadMeter from '../../components/markdown/components/ReadMeter';

interface BlogPostProps {
  blogPostContent: string; // THE MARKDOWN FILE CONTENT THAT IS EXTRACTED AND PARSED IN. (using extractFilename in markdownParser)
}

const BlogPost: React.FC<BlogPostProps> = ({ blogPostContent }) => {

  return (
    <>
    <ReadMeter />
    <MarkdownRenderer
    content={blogPostContent}
    contentAlignment="left"
    headingAlignment="left"
    showToc={true}
  />
  </>
);
};

export default BlogPost;