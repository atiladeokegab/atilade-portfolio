'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useWebHaptics } from 'web-haptics/react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const haptic = useWebHaptics();

  useEffect(() => {
    try {
      // Parse markdown headings directly from content
      const lines = content.split('\n');
      const parsedHeadings: Heading[] = [];
      
      lines.forEach((line) => {
        const trimmedLine = line.trim();
        
        // Match markdown headings (## for h2, ### for h3)
        const h2Match = trimmedLine.match(/^##\s+(.+)$/);
        const h3Match = trimmedLine.match(/^###\s+(.+)$/);
        
        if (h2Match) {
          const text = h2Match[1].trim();
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          
          parsedHeadings.push({
            id,
            text,
            level: 2
          });
        } else if (h3Match) {
          const text = h3Match[1].trim();
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
          
          parsedHeadings.push({
            id,
            text,
            level: 3
          });
        }
      });

      setHeadings(parsedHeadings);
    } catch (error) {
      console.error('Error parsing table of contents:', error);
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20 sm:top-24">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="border-l-2 border-gray-200 pl-3 sm:pl-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Contents</span>
          </h4>
          <nav aria-label="Table of contents">
            <ul className="space-y-1 sm:space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => {
                      haptic.trigger('selection');
                      scrollToHeading(heading.id);
                    }}
                    className={cn(
                      'text-xs sm:text-sm transition-all duration-200 w-full text-left py-1 px-2 rounded-md',
                      'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      heading.level === 3 ? 'pl-4 sm:pl-6 text-gray-500' : 'pl-2 text-gray-700',
                      activeId === heading.id 
                        ? 'text-blue-600 bg-blue-50 font-medium' 
                        : 'hover:text-gray-900'
                    )}
                  >
                    <span className="line-clamp-2">{heading.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
