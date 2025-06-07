import React, { useState } from 'react';
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
  BookOpen,
  Menu,
  X
} from 'lucide-react';

export function SideNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Siswa', href: '/employees', icon: Users },
    { label: 'Absensi', href: '/performance', icon: BarChart3 },
    { label: 'Daftar piket', href: '/recommendations', icon: Award },
    { label: 'Galery', href: '/insights', icon: BrainCircuit },
    { label: 'Achievement', href: '/projects', icon: Target }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-primary text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen w-64 border-r bg-background fixed left-0 top-0">
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

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="h-full w-64 bg-background shadow-lg">
            <div className="p-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">SMAN 10 PTK</h1>
                <p className="text-sm text-muted-foreground">Billingual Class</p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-muted-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
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
        </div>
      )}
    </>
  );
}
