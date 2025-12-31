import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <main className="mx-auto mt-6 max-w-7xl space-y-6">{children}</main>;
};
