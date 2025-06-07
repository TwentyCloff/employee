import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  BarChart3, 
  Home,
  Award,
  Target,
  BrainCircuit,
  BookOpen
} from 'lucide-react';

export function SideNav() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Member', href: '/employees', icon: Users },
    { label: 'Performance', href: '/performance', icon: BarChart3 },
    { label: 'Recommendations', href: '/recommendations', icon: Award },
    { label: 'Projects', href: '/projects', icon: Target },
    { label: 'AI Insights', href: '/insights', icon: BrainCircuit },
    { label: 'Learning', href: '/learning', icon: BookOpen }
  ];

  return (
    <div className="h-screen w-64 border-r bg-background fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold">SMAN 10 PTK</h1>
        <p className="text-sm text-muted-foreground">Billingual Class</p>
      </div>
      
      <nav className="space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
