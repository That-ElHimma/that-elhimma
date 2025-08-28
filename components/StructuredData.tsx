import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service' | 'article';
  data?: any;
}

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "That El-Himma",
          "url": "https://thatelhimma.com",
          "logo": "https://thatelhimma.com/images/path55-9.png",
          "description": "That El-Himma unifies strategy, data, and execution to accelerate business growth.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Global"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@thatelhimma.com"
          },
          "sameAs": [
            "https://twitter.com/thatelhimma",
            "https://linkedin.com/company/thatelhimma",
            "https://facebook.com/thatelhimma"
          ]
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "That El-Himma",
          "url": "https://thatelhimma.com",
          "description": "Tech solutions and business development services",
          "publisher": {
            "@type": "Organization",
            "name": "That El-Himma"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thatelhimma.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name || "Tech Solutions",
          "description": data.description || "Comprehensive tech solutions for business growth",
          "provider": {
            "@type": "Organization",
            "name": "That El-Himma"
          },
          "serviceType": data.serviceType || "Technology Consulting",
          "areaServed": data.areaServed || "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "That El-Himma Services"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title || "That El-Himma Article",
          "description": data.description || "Business insights from That El-Himma",
          "image": data.image || "https://thatelhimma.com/images/layer1006.png",
          "author": data.author || {
            "@type": "Organization",
            "name": "That El-Himma"
          },
          "publisher": {
            "@type": "Organization",
            "name": "That El-Himma",
            "logo": {
              "@type": "ImageObject",
              "url": "https://thatelhimma.com/images/path55-9.png"
            }
          },
          "datePublished": data.datePublished || new Date().toISOString(),
          "dateModified": data.dateModified || new Date().toISOString()
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
