'use client';

import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-xs">
      <section className="container mx-auto flex h-14 items-center">
        <section
          className="flex cursor-pointer items-center gap-x-2 text-base font-bold uppercase"
          onClick={() => router.push('/')}
        >
          <section className="flex h-6 w-6 rotate-45 items-center justify-center rounded-sm bg-black text-sm text-white">
            N
          </section>
          <h1>
            <span className="text-amber-400">N.</span>Concept
          </h1>
        </section>
        {/* <section className="ml-auto flex items-center gap-2 **:data-[slot=separator]:h-4! md:flex-1 md:justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost">
                <FileDownIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Download E-book</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="relative overflow-hidden text-gray-700">
                <MailIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Message</TooltipContent>
          </Tooltip>
        </section> */}
      </section>
    </header>
  );
};
