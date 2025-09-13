import React from 'react';
import { textColors, bgColors, cn } from '../../../styles/colors';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function CodeBlock() {
  return {
    code: ({
      node,
      inline,
      className = '',
      children,
      ...props
    }: CodeProps & { node?: any }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      // Force inline rendering when inline prop is true
      if (inline) {
        return (
          <code className={cn('px-1 py-0.5 rounded text-sm inline', 'bg-gray-200 dark:bg-gray-700')} {...props}>
            {children}
          </code>
        );
      }

      return ( 
        <div className={cn('my-4 rounded-lg overflow-hidden', bgColors.dark)}>
          {language && (
            <div className={cn('px-4 py-1 text-sm font-mono text-left text-center', bgColors.dark, textColors.light)}>
              {language}
            </div>
          )}
          <pre className={cn('p-4 overflow-x-auto text-left', bgColors.dark, textColors.light)}>
            <code className={`no-scrollbar language-${language}`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      )
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <div className="my-4">
        <pre {...props}>
          {children}
        </pre>
      </div>
    ),
  };
}
