import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';
import { borderColors, textColors } from '../../../styles/colors';

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
        className={`mb-4 leading-relaxed ${textColors.primary} ${getAlignmentClass()}`} 
        {...props} 
      />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a 
        className={textColors.a}
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
        className={`border-l-4 border-indigo-500 pl-4 italic my-6 ${textColors.primary} ${getAlignmentClass()}`}
        {...props} 
      />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className={`${borderColors.horizontalline} my-6`} {...props} />
    ),
  };
}
