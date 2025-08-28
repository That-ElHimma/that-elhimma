"use client"
import React, { useEffect } from 'react';

interface PerformanceMonitorProps {
  pageName: string;
}

export default function PerformanceMonitor({ pageName }: PerformanceMonitorProps) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            const lcp = lastEntry.startTime;
            console.log(`LCP: ${lcp}ms`);
            
            // Send to analytics if needed
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: pageName,
                value: Math.round(lcp),
                metric_value: Math.round(lcp),
                metric_id: 'LCP'
              });
            }
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer failed:', e);
        }
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            console.log(`FID: ${fid}ms`);
            
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: pageName,
                value: Math.round(fid),
                metric_value: Math.round(fid),
                metric_id: 'FID'
              });
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observer failed:', e);
        }
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        let clsEntries: any[] = [];
        
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += (entry as any).value;
              clsEntries.push(entry);
            }
          }
          
          console.log(`CLS: ${clsValue}`);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: pageName,
              value: Math.round(clsValue * 1000) / 1000,
              metric_value: Math.round(clsValue * 1000) / 1000,
              metric_id: 'CLS'
            });
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observer failed:', e);
        }
      }
    };

    // Track page load time
    const trackPageLoad = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          console.log(`Page Load Time: ${loadTime}ms`);
          console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
              name: 'load',
              value: Math.round(loadTime),
              event_category: 'Performance'
            });
          }
        }
      }
    };

    // Track user interactions
    const trackInteractions = () => {
      let interactionCount = 0;
      
      const trackInteraction = () => {
        interactionCount++;
        console.log(`User Interaction ${interactionCount}`);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'user_interaction', {
            event_category: 'Engagement',
            event_label: pageName,
            value: interactionCount
          });
        }
      };

      // Track clicks, scrolls, and other interactions
      document.addEventListener('click', trackInteraction);
      document.addEventListener('scroll', trackInteraction, { passive: true });
      document.addEventListener('keydown', trackInteraction);
    };

    // Initialize tracking
    trackWebVitals();
    trackPageLoad();
    trackInteractions();

    // Cleanup
    return () => {
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('scroll', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
    };
  }, [pageName]);

  // This component doesn't render anything visible
  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
