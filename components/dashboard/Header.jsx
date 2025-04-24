import React from 'react';
import { 
  Search,
  Bell,
  Settings
} from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b bg-background fixed top-0 right-0 left-64 z-10 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-10 w-64 rounded-md border border-input bg-background px-10 text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
        </button>
        <button className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <span className="text-sm font-medium">AD</span>
        </div>
      </div>
    </header>
  );
}