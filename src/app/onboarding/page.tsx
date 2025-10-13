'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasicProfileForm from '@/features/onboarding/components/BasicProfileForm';
import CompleteProfileForm from '@/features/onboarding/components/CompleteProfileForm';
import { BasicProfileData, CompleteProfileData } from '@/features/onboarding/types/onboarding';

type OnboardingStep = 'basic' | 'complete';

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [basicData, setBasicData] = useState<BasicProfileData>({ 
    name: '', 
    interests: [] 
  });
  const router = useRouter();

  const handleBasicSubmit = async (data: BasicProfileData) => {
    setIsLoading(true);
    try {
      // Guardar datos básicos
      setBasicData(data);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Avanzar a siguiente paso
      setStep('complete');
    } catch (error) {
      console.error('Error saving basic profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSubmit = async (data: CompleteProfileData) => {
    setIsLoading(true);
    try {
      // Combinar datos y enviar a API
      const completeData = { 
        basic: basicData, 
        complete: data 
      };
      
      console.log('Datos completos del onboarding:', completeData);
      
      // Aquí harías la llamada real a tu API
      // await userService.completeOnboarding(completeData);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir al dashboard
      router.push('/');
    } catch (error) {
      console.error('Error saving complete profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipComplete = () => {
    // Guardar solo los datos básicos y redirigir
    const basicOnlyData = {
      basic: basicData,
      complete: {}
    };
    
    console.log('Datos básicos (omitiendo completo):', basicOnlyData);
    
    // Redirigir al dashboard sin completar perfil completo
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-gray-900">MakerSpace</h1>
        </div>
        
        {/* Indicador de progreso */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'basic' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                step === 'basic' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Básico</span>
            </div>
            
            <div className="w-12 h-0.5 bg-gray-300"></div>
            
            <div className={`flex items-center ${step === 'complete' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                step === 'complete' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Completo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {step === 'basic' && (
          <BasicProfileForm
            onSubmit={handleBasicSubmit}
            isLoading={isLoading}
          />
        )}
        
        {step === 'complete' && (
          <CompleteProfileForm
            onSubmit={handleCompleteSubmit}
            onSkip={handleSkipComplete}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}