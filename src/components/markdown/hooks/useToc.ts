import { useEffect, useRef } from 'react';
import { useMarkdown } from '../context/MarkdownContext';

export const useToc = () => {
  const { setActiveId, registerHeading } = useMarkdown();
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        if (headingElement.target.id) {
          map[headingElement.target.id] = headingElement;
        }
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) => {
        const heading = visibleHeadings.find((h) => h.target.id === id);
        return heading ? heading.target.getBoundingClientRect().top : 0;
      };

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
      threshold: 0.5,
    });

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    headingElements.forEach((element) => {
      observer.observe(element);
      
      // Register the heading if it has an ID
      if (element.id) {
        const level = parseInt(element.tagName.substring(1), 10);
        registerHeading(element.id, element.textContent || '', level);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [setActiveId, registerHeading]);

  return { registerHeading };
};
