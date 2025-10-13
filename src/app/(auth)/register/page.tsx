'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FirebaseGoogleSignInButton } from '@/components/auth/FirebaseGoogleSignInButton';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithEmail, loading } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (formError) {
      setFormError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setFormError('El nombre es requerido');
      return false;
    }

    if (!formData.email.trim()) {
      setFormError('El email es requerido');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('El email no es válido');
      return false;
    }

    if (!formData.password) {
      setFormError('La contraseña es requerida');
      return false;
    }

    if (formData.password.length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (!formData.confirmPassword) {
      setFormError('Confirma tu contraseña');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return false;
    }

    if (!formData.acceptTerms) {
      setFormError('Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setFormError(null);

    try {
      await signUpWithEmail(
        formData.email.trim(), 
        formData.password, 
        formData.username.trim()
      );
      
      // Redirigir al dashboard después del registro exitoso
      router.push('/onboarding');
    } catch (caughtError: unknown) {
      const errorMessage = caughtError instanceof Error ? caughtError.message : 'Error en el registro';
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">
            Únete a nuestra comunidad de makers
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Google Sign In */}
          <FirebaseGoogleSignInButton 
            text="Regístrate con Google"
            redirectTo="/onboarding"
          />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <Input
              label="Username"
              name="username"
              type="text"
              maxLength={15}
              value={formData.username}
              onChange={handleInputChange}
              leftIcon={<User size={18} />}
              placeholder="Tu username"
              disabled={loading || isLoading}
              required
            />

            {/* Email */}
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              leftIcon={<Mail size={18} />}
              placeholder="tu@email.com"
              disabled={loading || isLoading}
              required
            />

            {/* Password */}
            <Input
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              leftIcon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading || isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              placeholder="••••••••"
              disabled={loading || isLoading}
              required
              helperText="Mínimo 8 caracteres"
            />

            {/* Confirm Password */}
            <Input
              label="Confirmar contraseña"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              leftIcon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading || isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              placeholder="••••••••"
              disabled={loading || isLoading}
              required
            />

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                disabled={loading || isLoading}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <label 
                htmlFor="acceptTerms" 
                className="text-sm text-gray-700 disabled:opacity-50"
              >
                Acepto los{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  política de privacidad
                </Link>
              </label>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{formError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={loading || isLoading}
              disabled={loading || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              size="lg"
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Login Link */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Iniciar sesión en tu cuenta
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <Link href="/terms" className="text-gray-600 hover:text-gray-800 underline">
              Términos de Servicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}