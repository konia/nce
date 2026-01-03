// components/BackButton.jsx
'use client'; // 必须标记为客户端组件
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function BackButton({ url }: { url: string }) {
  const router = useRouter();

  // 内部定义返回逻辑
  const handleGoBack = () => {
    router.push(url);
  };

  return (
    <Button onClick={handleGoBack} size="icon-lg" className="outline-3 outline-amber-100/80 outline-solid">
      <ArrowLeftIcon />
    </Button>
  );
}
