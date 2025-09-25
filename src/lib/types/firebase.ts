// src/types/firebase.ts
export interface FirebaseError extends Error {
  code?: string;
  message: string;
  name: string;
}

export interface AuthError extends FirebaseError {
  code: string;
  customData?: {
    serverResponse?: string;
    appName?: string;
  };
}

// Tipo para error genérico
export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};