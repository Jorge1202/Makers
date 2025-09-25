// src/hooks/useFirebaseAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError as FirebaseAuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client'; 
import { AuthError, ApiError } from '@/lib/types/firebase'; 

// Función type-safe para manejar errores de Firebase
function getFirebaseErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const firebaseError = error as FirebaseAuthError;
    
    // Mapear códigos de error de Firebase a mensajes amigables
    const errorMap: Record<string, string> = {
      'auth/invalid-email': 'El email no es válido',
      'auth/user-disabled': 'La cuenta ha sido deshabilitada',
      'auth/user-not-found': 'No existe una cuenta con este email',
      'auth/wrong-password': 'La contraseña es incorrecta',
      'auth/email-already-in-use': 'Este email ya está en uso',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/popup-closed-by-user': 'El popup de Google fue cerrado',
      'auth/popup-blocked': 'El popup de Google fue bloqueado',
      'auth/network-request-failed': 'Error de conexión de red',
    };

    return errorMap[firebaseError.code] || firebaseError.message || 'Error desconocido';
  }
  
  return 'Error desconocido';
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      debugger
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);      
      console.log('Google sign-in result:', result);

      debugger
      return result.user;
    } catch (caughtError: unknown) {
      const errorMessage = getFirebaseErrorMessage(caughtError);
      console.log('Google sign-in error:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);

      console.log('Email sign-in result:', result);
      return result.user;
    } catch (caughtError: unknown) {
      const errorMessage = getFirebaseErrorMessage(caughtError);
      console.log('Email sign-in error:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string, 
    password: string, 
    displayName: string
  ): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      return result.user;
    } catch (caughtError: unknown) {
      const errorMessage = getFirebaseErrorMessage(caughtError);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setError(null);

      debugger
      await firebaseSignOut(auth);
    } catch (caughtError: unknown) {
      const errorMessage = getFirebaseErrorMessage(caughtError);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
}