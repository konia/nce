'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="relative">
      <span className="translate-x-0 opacity-100 transition-all duration-3000 ease-in-out dark:-translate-x-6 dark:opacity-0">
        <Sun size={16} />
      </span>
      {/* <Moon
        size={16}
        className={cn('absolute translate-x-6 opacity-100 dark:translate-x-0 dark:opacity-100 dark:transition-all')}
      /> */}
    </Button>
  );
}
