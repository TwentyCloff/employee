import {
  Search
} from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { Input } from '../ui/input';

export function Header() {
  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-lg fixed top-0 right-0 left-64 z-10 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-md border border-input bg-background px-10 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="none" strokeWidth="1px" opacity="1" filter="none"><mask id=":r0:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:r0:)"><rect width="36" height="36" fill="#49007e"></rect><rect x="0" y="0" width="36" height="36" transform="translate(7 1) rotate(133 18 18) scale(1.1)" fill="#ff7d10" rx="6"></rect><g transform="translate(3.5 -2) rotate(-3 18 18)"><path d="M15 20c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path><rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
      </div>
    </header>
  );
}