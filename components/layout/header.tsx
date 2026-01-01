'use client';

import { MailIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { Button } from '../ui/button';

// import { ThemeToggle } from '@/components/layout/theme-toggle';
// import { Separator } from '@/components/ui/separator';

// import { Button } from '../ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-xs">
      <section className="container mx-auto flex h-14 items-center">
        <section className="flex items-center gap-x-2 text-base font-bold uppercase">
          <section className="flex h-6 w-6 rotate-45 items-center justify-center rounded-sm bg-black text-sm text-white">
            N
          </section>
          <h1>
            <span className="text-amber-400">N.</span>Concept
          </h1>
        </section>
        <section className="ml-auto flex items-center gap-2 **:data-[slot=separator]:h-4! md:flex-1 md:justify-end">
          <Separator orientation="vertical" />
          {/* <ThemeToggle /> */}

          <Button variant="ghost" size="icon-sm" className="relative overflow-hidden text-gray-700">
            <MailIcon size={16} />
          </Button>
          {/* <Button size="sm">Button</Button> */}
        </section>
      </section>
    </header>
  );
};
