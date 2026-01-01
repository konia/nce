// components/BackButton.jsx
'use client'; // 必须标记为客户端组件
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();

  // 内部定义返回逻辑
  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleGoBack}>
      <ArrowLeftIcon />
      Go Back
    </Button>
  );
}
