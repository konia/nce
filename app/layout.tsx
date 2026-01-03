import type { Metadata } from 'next';
import { Capriola } from 'next/font/google';

// import { ThemeProvider } from 'next-themes';
import { Container } from '@/components/layout/container';
import { Header } from '@/components/layout/header';

import './globals.css';

const capriola = Capriola({
  variable: '--font-sans',
  weight: '400'
});
export const metadata: Metadata = {
  title: 'New Concept English',
  description: 'Up Your Skills to Advance Your Career Path',
  openGraph: {
    title: 'New Concept English',
    description: 'Up Your Skills to Advance Your Career Path',
    url: 'https://nce-red.vercel.app/',
    siteName: 'New Concept English',
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${capriola.variable} antialiased`} suppressHydrationWarning>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableColorScheme={true} // 🔥 增强主题加载，减少水合冲突
          storageKey="next-theme"
        > */}
        <Header></Header>
        <Container>{children}</Container>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
