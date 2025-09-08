import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';
import { textColors, cn } from '../../../styles/colors';

export default function Lists() {
  const { contentAlignment } = useMarkdown();
  
  const getAlignmentClass = () => {
    return {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[contentAlignment] || 'text-left';
  };

  return {
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul 
        className={cn('list-disc pl-6 mb-4 space-y-2', textColors.primary, getAlignmentClass())} 
        {...props} 
      />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
      <ol 
        className={cn('list-decimal pl-6 mb-4 space-y-2', textColors.primary, getAlignmentClass())} 
        {...props} 
      />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li 
        className={`mb-1 ${getAlignmentClass()}`} 
        {...props} 
      />
    ),
  };
}
