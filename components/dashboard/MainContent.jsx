"use client";

import { useEffect, useState } from 'react';

export function MainContent({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className={cn(
      "min-h-screen flex flex-col",
      "transition-all duration-300 ease-in-out",
      isCollapsed ? "ml-16" : "ml-64"
    )}>
      {children}
    </main>
  );
}
