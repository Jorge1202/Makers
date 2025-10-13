// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FirebaseGoogleSignInButton } from '@/components/auth/FirebaseGoogleSignInButton';
import { Mail, Lock } from 'lucide-react';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, loading } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string; 
    const password = formData.get('password') as string; 

    try {
      await signInWithEmail(email, password);
      router.push('/');
    } catch (caughtError: unknown) {
      // El error ya viene como string desde el hook
      setFormError(caughtError instanceof Error ? caughtError.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Accede a tu cuenta de Makers</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Google Sign In */}
          <FirebaseGoogleSignInButton />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              leftIcon={<Mail size={18} />}
              placeholder="tu@email.com"
              disabled={loading || isLoading}
              required
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              leftIcon={<Lock size={18} />}
              placeholder="••••••••"
              disabled={loading || isLoading}
              required
            />

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading || isLoading}
              disabled={loading || isLoading}
              className="w-full"
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}