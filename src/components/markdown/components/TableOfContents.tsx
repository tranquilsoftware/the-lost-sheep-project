import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';
import { textColors, cn } from '../../../styles/colors';

const TABLE_OF_CONTENTS_HIGHLIGHT_HEADING_DELAY = 50;

const TableOfContents: React.FC = () => {

  const { headings, activeId, setActiveId } = useMarkdown();
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + 100; // Add some offset
        
        // Find the last heading that's above the scroll position
        const headingElements = headings.map(({ id }) => ({
          id,
          element: document.getElementById(id),
        })).filter(({ element }) => element !== null);

        let currentActiveId = null;
        for (const { id, element } of headingElements) {
          if (!element) continue;
          if (element.offsetTop <= scrollPosition) {
            currentActiveId = id;
          } else {
            break;
          }
        }

        if (currentActiveId && currentActiveId !== activeId) {
          setActiveId(currentActiveId);
        }
      }, TABLE_OF_CONTENTS_HIGHLIGHT_HEADING_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [headings, activeId, setActiveId]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-4 self-start flex-shrink-0 mr-8 hidden lg:block">
      <div className="overflow-hidden">
        <div className="px-4 py-2">
          <h2 className={cn('text-md font-medium font-bold', textColors.dark)}>
            Contents
          </h2>
        </div>
        <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  'text-xs',
                  activeId === heading.id 
                    ? cn(textColors.accent, 'font-medium')
                    : cn(textColors.secondary, 'hover:text-secondary')
                )}
                style={{ marginLeft: `${(heading.level - 2) * 0.5}rem` }}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="w-full text-left px-2 py-1 hover:underline"
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
