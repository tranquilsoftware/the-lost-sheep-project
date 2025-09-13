import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { MIN_PC_WIDTH } from '../../../globals';

type Alignment = 'left' | 'center' | 'right';

interface MarkdownContextType {
  contentAlignment: Alignment;
  headingAlignment: Alignment;
  showToc: boolean;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  headings: Array<{ id: string; text: string; level: number }>;
  registerHeading: (id: string, text: string, level: number) => void;
  hasEnoughSpaceForToc: boolean;
}

const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined);

interface MarkdownProviderProps {
  children: ReactNode;
  contentAlignment?: Alignment;
  headingAlignment?: Alignment;
  showToc?: boolean;
}


// TODO magic number 1440, ew need ti more dynamic, having trouble rn
export const MarkdownProvider: React.FC<MarkdownProviderProps> = ({
  children,
  contentAlignment = 'left',
  headingAlignment = 'left',
  showToc = true,
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  // Track the order of headings as they're registered
  const orderRef = React.useRef(0);
  const [headings, setHeadings] = React.useState<Array<{ 
    id: string; 
    text: string; 
    level: number;
    order: number;
  }>>([]);
  const [hasEnoughSpaceForToc, setHasEnoughSpaceForToc] = React.useState(false);

  const registerHeading = React.useCallback((id: string, text: string, level: number) => {
    setHeadings(prev => {
      // Don't add duplicate headings
      if (prev.some(h => h.id === id)) return prev;
      
      // Create a new array with the new heading at the end
      const newHeadings = [...prev, { 
        id, 
        text, 
        level, 
        order: orderRef.current++ 
      }];
      
      // Sort by the order they were registered (document order)
      return newHeadings.sort((a, b) => a.order - b.order);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setHasEnoughSpaceForToc(window.innerWidth > MIN_PC_WIDTH);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    console.log('hasEnoughSpaceForToc', hasEnoughSpaceForToc);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = React.useMemo(() => ({
    contentAlignment,
    headingAlignment,
    showToc,
    activeId,
    setActiveId,
    headings,
    registerHeading,
    hasEnoughSpaceForToc,
  }), [contentAlignment, headingAlignment, showToc, activeId, headings, registerHeading, hasEnoughSpaceForToc]);

  return (
    <MarkdownContext.Provider value={value}>
      {children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdown = () => {
  const context = useContext(MarkdownContext);
  if (context === undefined) {
    throw new Error('useMarkdown must be used within a MarkdownProvider');
  }
  return context;
};

export default MarkdownContext;