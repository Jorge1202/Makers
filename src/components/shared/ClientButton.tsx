'use client';

import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const ClientButton = ({ handlerClick }: { handlerClick: () => void }) => {
  return (
    <Button variant="ghost" onClick={handlerClick} className="flex items-center gap-2">
      <ArrowLeft size={18} />
      Regresar
    </Button>
  );
}