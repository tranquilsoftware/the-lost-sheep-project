import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';

export default function Text() {
  const { contentAlignment } = useMarkdown();
  
  const getAlignmentClass = () => {
    return {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[contentAlignment] || 'text-left';
  };

  return {
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p 
        className={`mb-4 leading-relaxed text-gray-700 dark:text-gray-300 ${getAlignmentClass()}`} 
        {...props} 
      />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a 
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-semibold" {...props} />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
      <em className="italic" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote 
        className={`border-l-4 border-indigo-500 pl-4 italic my-6 text-gray-600 dark:text-gray-400 ${getAlignmentClass()}`}
        {...props} 
      />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />
    ),
  };
}
