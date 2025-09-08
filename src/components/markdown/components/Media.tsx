import React from 'react';
import { textColors, cn } from '../../../styles/colors';

export default function Media() {
  return {
    img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <div className="my-6 rounded-lg overflow-hidden">
        <img 
          className="w-full h-auto" 
          alt={alt || 'Blog post image'}
          {...props}
        />
        {alt && (
          <p className={cn('text-center text-sm mt-2', textColors.muted)}>
            {alt}
          </p>
        )}
      </div>
    ),
    // You can add more media components here as needed
  };
}
