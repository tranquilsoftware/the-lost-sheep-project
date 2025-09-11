import React from 'react';
import { textColors, cn } from '../../../styles/colors';

export default function Media() {
  return {

    /**
     * How to embed in .md file:
     * @code
     * <img src="https://i.imgur.com/CdnTZ20.png" alt="Tranquil Software" />
     * @endcode
     * @param param0 alt (alt text for image)
     * @returns embeded image
     */
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

    /**
     * How to embed in .md file:
     * @code
     * <youtube id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" />
     * @endcode
     * @param param0 id (code of yt vid e.g. dQw4w9WgXcQ)
     * @returns embeded yt vid
     */
    youtube: ({ id, title = "YouTube video" }: { id: string; title?: string }) => (
      <div className="my-6 rounded-lg overflow-hidden aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ),

    /**
     * google maps, any iframe contents
     * How to embed in .md file:
     * @code
     * <iframe src="https://www.google.com/maps/embed?KEYS" title="Tranquil Software" />
     * @endcode
     * @param param0 src (url of iframe)
     * @param param0 title (title of iframe)
     * @param param0 props (other props for iframe)
     * @returns embeded iframe
     */
    iframe: ({ src, title, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
      <div className="my-6 rounded-lg overflow-hidden">
        <iframe
          className="w-full h-96"
          src={src}
          title={title || "Embedded content"}
          frameBorder="0"
          allowFullScreen
          {...props}
        />
      </div>
    ),
    // You can add more media components here as needed
  };
}