"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  BarChart3, 
  Home,
  Award,
  Target,
  BrainCircuit
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function SideNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Siswa', href: '/employees', icon: Users },
    { label: 'Absensi', href: '/performance', icon: BarChart3 },
    { label: 'Daftar piket', href: '/recommendations', icon: Award },
    { label: 'Galery', href: '/insights', icon: BrainCircuit },
    { label: 'Achievement', href: '/projects', icon: Target }
  ];

  return (
    <div className={cn(
      "h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "fixed left-0 top-0 z-20",
      "transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "p-4 border-b",
        isCollapsed ? "px-3" : "px-6"
      )}>
        {isCollapsed ? (
          <h1 className="text-xl font-bold text-center">10</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold">SMAN 10 PTK</h1>
            <p className="text-sm text-muted-foreground">Billingual Class</p>
          </>
        )}
      </div>
      
      <nav className="space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center py-3 text-sm font-medium rounded-md",
                "transition-colors duration-200",
                isCollapsed ? "px-2 justify-center" : "px-4",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
