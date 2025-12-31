'use client';

import { ThemeToggle } from '@/components/theme-toggle';

export const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="flex items-center font-semibold">New Concept English</h1>
      <section>
        <ThemeToggle />
      </section>
    </header>
  );
};
