import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto before:absolute before:inset-0 before:-z-1 before:bg-linear-to-tl before:from-[#ffd3c8] before:from-35% before:via-[#FFFFFF] before:via-50% before:to-[#FDF1D3] before:to-65% before:blur-[300px]">
      {children}
    </main>
  );
};
