// components/BackButton.jsx
'use client'; // 必须标记为客户端组件
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function MoveButton({ type, disabled, index }: { type: string; disabled: boolean; index: number }) {
  const router = useRouter();
  const handleMovePage = () => {
    router.push(`/book/nce-${index}`);
  };

  return (
    <Button onClick={handleMovePage} disabled={disabled} variant="outline" size="icon-lg">
      {type == 'forward' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </Button>
  );
}
