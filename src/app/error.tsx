'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
    // Puedes integrar aquí servicios como Sentry, LogRocket, etc.
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Ocurrió un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="space-y-3">        
          <Button onClick={reset}>
            Reintentar
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}