import React from 'react';
import Head from 'next/head';
import StructuredData from './StructuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'That El-Himma',
  section,
  tags = [],
  structuredData,
  noindex = false,
  nofollow = false,
  canonical,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | That El-Himma` : 'That El-Himma - Tech Solutions & Business Development';
  const fullDescription = description || 'That El-Himma unifies strategy, data, and execution to accelerate business growth. Expert tech solutions, digital transformation, and business development services.';
  const fullUrl = url || 'https://thatelhimma.com';
  const fullImage = image.startsWith('http') ? image : `https://thatelhimma.com${image}`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={fullDescription} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta name="author" content={author} />
        
        {/* Robots */}
        <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
        
        {/* Canonical URL */}
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={fullDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:site_name" content="That El-Himma" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={fullDescription} />
        <meta name="twitter:image" content={fullImage} />
        <meta name="twitter:site" content="@thatelhimma" />
        <meta name="twitter:creator" content="@thatelhimma" />
        
        {/* Article specific meta tags */}
        {type === 'article' && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {type === 'article' && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}
        {type === 'article' && author && (
          <meta property="article:author" content={author} />
        )}
        {type === 'article' && section && (
          <meta property="article:section" content={section} />
        )}
        {type === 'article' && tags.length > 0 && (
          tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))
        )}
        
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="That El-Himma" />
        <meta name="apple-mobile-web-app-title" content="That El-Himma" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      
      {/* Structured Data */}
      {structuredData && (
        <StructuredData type="website" data={structuredData} />
      )}
    </>
  );
}
