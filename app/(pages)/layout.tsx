'use client';
import React from 'react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
