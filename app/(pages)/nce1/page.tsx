'use client';

import { Button } from '@/components/ui/button';
import { fetchApi } from '@/lib/api';

export default function Home() {
  const getUserData = async () => {
    const res = await fetchApi('https://randomuser.me/api/');
    console.log('🚀 ~ getUserData ~ res:', res);
  };
  return (
    <main className="container mx-auto">
      <section>
        <h1>Learn English With New Concept English</h1>
        <Button onClick={getUserData}>Button</Button>
      </section>
    </main>
  );
}
