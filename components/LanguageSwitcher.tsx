import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  currentLocale: string;
  availableLocales: string[];
}

export default function LanguageSwitcher({ currentLocale, availableLocales }: LanguageSwitcherProps) {
  const router = useRouter();
  
  const getLocaleName = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'English';
      case 'ar':
        return 'العربية';
      default:
        return locale;
    }
  };

  const getLocaleFlag = (locale: string) => {
    switch (locale) {
      case 'en':
        return '🇺🇸';
      case 'ar':
        return '🇸🇦';
      default:
        return '🌐';
    }
  };

  const getAlternateUrl = (locale: string) => {
    const path = router.asPath;
    if (locale === 'en') {
      return path.replace(/^\/ar/, '') || '/';
    }
    return `/${locale}${path}`;
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <span>{getLocaleFlag(currentLocale)}</span>
        <span className="hidden sm:inline">{getLocaleName(currentLocale)}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {availableLocales.map((locale) => (
            <Link
              key={locale}
              href={getAlternateUrl(locale)}
              locale={locale}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span>{getLocaleFlag(locale)}</span>
              <span>{getLocaleName(locale)}</span>
              {locale === currentLocale && (
                <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Hreflang links for SEO */}
      <div className="hidden">
        {availableLocales.map((locale) => (
          <Link
            key={locale}
            href={getAlternateUrl(locale)}
            locale={locale}
            rel="alternate"
            hrefLang={locale}
          />
        ))}
        <Link href={getAlternateUrl('en')} locale="en" rel="alternate" hrefLang="x-default" />
      </div>
    </div>
  );
}
