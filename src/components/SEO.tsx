import React, { useEffect } from 'react';
import { WEBSITE_URL, WEBSITE_TITLE, LOGO, GEO_POSITION, GEO_SUBURB, GEO_REGION, META_THEME_COLOR, GLOBAL_META_TAGS, GLOBAL_META_DESCRIPTION } from '../globals';

type SEOProps = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description = GLOBAL_META_DESCRIPTION,
  path,
  image = LOGO,
  article = false,
  publishedTime,
  modifiedTime,
  author = 'Tranquil Software',
  tags = GLOBAL_META_TAGS,
}) => {
  const pageTitle = title 
    ? `${title} | ${WEBSITE_TITLE}` 
    : WEBSITE_TITLE;

  const url = `${WEBSITE_URL}${path}`;
  const ogImage = image.startsWith('http') ? image : `${WEBSITE_URL}${image}`;


  useEffect(() => {
    // Update theme color
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', META_THEME_COLOR);
    }

    // Update viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
  }, []);

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />

      {/* incl tags */}
      {tags.length > 0 && 
        <meta name="keywords" content={tags.join(', ')} />
      }

      {( // this is in australia
        <>
          <meta name="geo.region" content={GEO_REGION} />
          <meta name="geo.placename" content={GEO_SUBURB} />
          <meta name="geo.position" content={GEO_POSITION} />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={WEBSITE_TITLE} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* iOS specific */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={WEBSITE_TITLE} />


      {/* Article specific */}
      {article && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

    </>

  );
};

export default SEO;
