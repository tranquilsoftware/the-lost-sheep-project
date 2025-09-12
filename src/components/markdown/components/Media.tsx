import React from 'react';
import { textColors, cn } from '../../../styles/colors';
import { ImageGallery, ImageGalleryThumbnail, ThumbnailOptions } from '../ui/ImageGallery';

export default function Media() {
  return {

    /**
     * How to embed in .md file:
     * @code
     * <img src="https://i.imgur.com/CdnTZ20.png" alt="Tranquil Software" />
     * @endcode
     * @param alt (alt text for image)
     * @param props (other props for image)
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
     * @param id (code of yt vid e.g. dQw4w9WgXcQ)
     * @param title (title of yt vid)
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
     * @param src (url of iframe)
     * @param title (title of iframe)
     * @param props (other props for iframe)
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


    /**
     * How to embed in .md file:
     * @code
     * <imagegallery title="My Photo Collection" images='[{"src": "https://i.imgur.com/CdnTZ20.png", "alt": "A beautiful landscape placeholder image"}]' />
     * @endcode
     * 
     * @param title (title of the gallery)
     * @param images (JSON string of images to display in the gallery)
     * @param fullWidth (whether the gallery should take full width of its container)
     * @param centerThumbnails (whether to center the thumbnails in the container)
     * @returns embeded image gallery
     */
    imagegallery: (
      { title,
        images,
        fullWidth = false,
        centerThumbnails = false ,
        thumbnailOptions = {
          width: 256,
          height: 256,
          borderRadius: 12,
          gap: 24
        } as ThumbnailOptions
      }: { title: string; images: string; fullWidth?: boolean; centerThumbnails?: boolean; thumbnailOptions?: ThumbnailOptions }) => {
      try {
        // DEBUG: Log the raw images string
        // console.log('Raw images string:', images);
        

        // Parse the JSON string to ImageGalleryThumbnail[]
        const parsedImages = JSON.parse(images) as ImageGalleryThumbnail[];
        
        // DEBUG: Log the parsed images array
        // console.log('Parsed images array:', parsedImages);
        // console.log('Number of images:', parsedImages.length);
        
        return (
          <ImageGallery 
          images={parsedImages} 
          title={title}
          fullWidth={fullWidth}
          centerThumbnails={centerThumbnails}
          thumbnailOptions={thumbnailOptions}
        />
        );
      } catch (error) {
        console.error('Error parsing images JSON:', error);
        console.error('Error details:', error instanceof Error ? error.message : error);
        return (
          <div className="my-6 p-4 border border-red-300 bg-red-50 rounded-lg">
            <p className="text-red-700">Error: Invalid images data format. Please ensure images is a valid JSON string.</p>
          </div>
        );
      }
    }
    
    // You can add more media components here as needed
  };
}