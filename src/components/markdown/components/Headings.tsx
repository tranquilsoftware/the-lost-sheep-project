import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';
import { textColors, cn } from '../../../styles/colors';

const generateId = (children: React.ReactNode) => {
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  return '';
};

export default function Headings() {
  const { headingAlignment, registerHeading } = useMarkdown();
  
  const getHeadingClasses = (level: number) => {
    const baseClasses = {
      1: 'text-4xl font-bold mb-6 mt-10',
      2: 'text-3xl font-bold mb-5 mt-8',
      3: 'text-2xl font-semibold mb-4 mt-6',
      4: 'text-xl font-semibold mb-3 mt-5',
      5: 'text-lg font-medium mb-2 mt-4',
      6: 'text-base font-medium mb-2 mt-4',
    }[level] || 'text-base mb-2 mt-4';

    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[headingAlignment] || 'text-left';

    return cn(baseClasses, alignmentClasses, textColors.primary);
  };

  const createHeading = (level: number) => {
    const HeadingTag = `h${level}` as const;
    
    return ({
      children, 
      className = '',
      ...restProps
    }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = generateId(children);
      const ref = React.useRef<HTMLHeadingElement>(null);

      React.useEffect(() => {
        if (id && ref.current) {
          ref.current.id = id;
          registerHeading(id, ref.current.textContent || '', level);
        }
      }, [id, level, registerHeading]);

      const headingProps = {
        ...restProps,
        ref,
        className: cn(getHeadingClasses(level), className)
      };

      return React.createElement(HeadingTag, headingProps, children);
    };
  };

  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
  };
}
