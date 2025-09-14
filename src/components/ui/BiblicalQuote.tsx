import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { isMobile } from '../../utils/mobileUtils';

interface BiblicalQuoteProps {
  quote: string;
  reference: string;
  className?: string;
  hoverEffect?: boolean;
  rounded?: boolean;
}

export const BiblicalQuote: React.FC<BiblicalQuoteProps> = ({
  quote,
  reference,
  className = '',
  hoverEffect = false,
  rounded = false,
}) => {
  // Mobile detection setup (kept for future use)
  const [_, setMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobileView(isMobile());
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`group relative overflow-hidden p-6 transition-all duration-300 ease-out cursor-default bg-background-secondary ${
        hoverEffect ? 'hover:bg-accent-light/50' : ''
      } ${rounded ? 'rounded-2xl' : ''} ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Top row with icon and reference */}
        <div className="flex items-center justify-between mb-4">
          <BookOpen 
            className={`w-8 h-8 text-primary ${
              hoverEffect ? 'group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out' : ''
            }`} 
          />
          <p className="text-sm font-medium text-content-secondary">
            — {reference}
          </p>
        </div>
        
        {/* Quote content */}
        <div className="flex-1 flex items-center justify-center text-center">
          <blockquote className="text-lg italic text-content">
            "{quote}"
          </blockquote>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      {hoverEffect && (
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
          rounded ? 'rounded-2xl' : ''
        } bg-primary`} />
      )}
    </div>
  );
};

// Example usage:
/*
<BiblicalQuote 
  quote="Your quote here"
  reference="Book 1:1"
  className="custom-class"
  hoverEffect={true}
  rounded={true}
/>
*/

// Default export with the specific quote requested
export const Matthew1914Quote: React.FC<{ className?: string }> = ({ className }) => (
  <BiblicalQuote
    quote="Jesus said, 'Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.'"
    reference="Matthew 19:14"
    className={className}
  />
);

export const Proverbs1917Quote: React.FC<{ className?: string }> = ({ className }) => (
  <BiblicalQuote
    quote="Whoever is kind to the poor lends to the LORD, and He will reward them for what they have done."
    reference="Proverbs 19:17"
    className={className}
  />
);

export const John812Quote: React.FC<{ className?: string }> = ({ className }) => (
  <BiblicalQuote
    quote="I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life."
    reference="John 8:12"
    className={className}
  />
);

export const John635Quote: React.FC<{ className?: string }> = ({ className }) => (
  <BiblicalQuote
    quote="I am the bread of life. Whoever comes to me will never hunger, and whoever believes in me will never thirst."
    reference="John 6:35"
    className={className}
  />
);

export const Acts2035Quote: React.FC<{ className?: string }> = ({ className }) => (
  <BiblicalQuote
    quote="In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'"
    reference="Acts 20:35"
    className={className}
  />
);