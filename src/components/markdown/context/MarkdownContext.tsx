import React, { createContext, useContext, ReactNode } from 'react';

type Alignment = 'left' | 'center' | 'right';

interface MarkdownContextType {
  contentAlignment: Alignment;
  headingAlignment: Alignment;
  showToc: boolean;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  headings: Array<{ id: string; text: string; level: number }>;
  registerHeading: (id: string, text: string, level: number) => void;
}

const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined);

interface MarkdownProviderProps {
  children: ReactNode;
  contentAlignment?: Alignment;
  headingAlignment?: Alignment;
  showToc?: boolean;
}

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


  const value = React.useMemo(() => ({
    contentAlignment,
    headingAlignment,
    showToc,
    activeId,
    setActiveId,
    headings,
    registerHeading,
  }), [contentAlignment, headingAlignment, showToc, activeId, headings, registerHeading]);

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
