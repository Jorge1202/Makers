// src/components/auth/FirebaseGoogleSignInButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';

interface FirebaseGoogleSignInButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  redirectTo?: string;
}

export function FirebaseGoogleSignInButton({
  variant = 'outline',
  size = 'md',
  text = 'Continuar con Google',
  redirectTo = '/dashboard'
}: FirebaseGoogleSignInButtonProps) {
  const router = useRouter();
  const { signInWithGoogle, loading, error } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push(redirectTo);
    } catch (caughtError: unknown) {
      // El error ya está manejado en el hook y mostrado en el estado `error`
      console.error('Error signing in with Google:', caughtError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleGoogleSignIn}
        disabled={loading || isLoading}
        isLoading={loading || isLoading}
        className="w-full flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
      >
        <FcGoogle className="w-5 h-5" />
        {text}
      </Button>
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </>
  );
}

export default FirebaseGoogleSignInButton;