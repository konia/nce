'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={toggleTheme} className="relative overflow-hidden">
          <span className="translate-x-0 opacity-100 transition-all duration-300 ease-in-out dark:-translate-x-6 dark:opacity-0">
            <Sun size={16} />
          </span>
          <Moon
            size={16}
            className="absolute translate-x-6 opacity-0 transition-all duration-300 ease-in-out dark:translate-x-0 dark:opacity-100"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle Mode</TooltipContent>
    </Tooltip>
  );
}
