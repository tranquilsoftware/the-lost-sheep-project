import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { MarkdownProvider, useMarkdown } from './context/MarkdownContext';
import Headings from './components/Headings';
import Text from './components/Text';
import Lists from './components/Lists';
import CodeBlock from './components/CodeBlock';
import Table from './components/Table';
import Media from './components/Media';
import TableOfContents from './components/TableOfContents';
import 'highlight.js/styles/github-dark.css';
import ReadMeter from './components/ReadMeter';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  headingAlignment?: 'left' | 'center' | 'right';
  showToc?: boolean;
}

const MarkdownContent: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          ...Headings(),
          ...Text(),
          ...Lists(),
          ...CodeBlock(),
          ...Table(),
          ...Media(),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const MarkdownContentWrapper: React.FC<{ content: string; className?: string; showToc?: boolean }> = ({ content, className, showToc }) => {
  const { hasEnoughSpaceForToc } = useMarkdown();
  const shouldShowToc = showToc && hasEnoughSpaceForToc;

  console.log('shouldShowToc 2', shouldShowToc);
  console.log('hasEnoughSpaceForToc 2', hasEnoughSpaceForToc);

  return (
    <div className="relative w-full">
      {/* <ReadMeter /> */}
      <div className="max-w-4xl mx-auto px-4 relative">
        {shouldShowToc && (
          <div className="hidden lg:block absolute right-full pr-8 w-64 top-0 h-full">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        )}
        <div className="w-full">
          <MarkdownContent content={content} className={className} />
        </div>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  contentAlignment = 'left',
  headingAlignment = 'left',
  showToc = true,
}) => {
  return (
    <MarkdownProvider
      contentAlignment={contentAlignment}
      headingAlignment={headingAlignment}
      showToc={showToc}
    >
      <MarkdownContentWrapper content={content} className={className} showToc={showToc} />
    </MarkdownProvider>
  );
};

export default MarkdownRenderer;
