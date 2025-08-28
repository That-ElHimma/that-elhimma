import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://thatelhimma.com${item.href}`
    }))
  };

  return (
    <>
      <StructuredData type="website" data={structuredData} />
      
      <nav className={`flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 ${className}`} aria-label="Breadcrumb">
        <Link
          href="/"
          className="flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <HomeIcon className="w-4 h-4 mr-1" />
          <span className="sr-only">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            {item.isCurrent ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
