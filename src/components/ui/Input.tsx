'use client';

import React, { useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del input */
  label?: string;
  /** Mensaje de error */
  error?: string;
  /** Mensaje de ayuda */
  helperText?: string;
  /** Icono izquierdo */
  leftIcon?: React.ReactNode;
  /** Icono derecho */
  rightIcon?: React.ReactNode;
  /** Si está cargando */
  isLoading?: boolean;
  /** Variante visual */
  variant?: 'default' | 'filled' | 'outlined';
  /** Tamaño del input */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Clase personalizada para el contenedor */
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isLoading = false,
      variant = 'default',
      inputSize = 'md',
      disabled,
      id,
      containerClassName,
      ...props
    },
    ref
  ) => {
    // Generar ID automáticamente si no se proporciona
    const generatedId = useId();
    const inputId = id || generatedId;

    // Clases base para el contenedor
    const containerBaseStyles = 'relative flex items-center w-full transition-all duration-200 rounded-lg border focus-within:ring-2 focus-within:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variantes para el contenedor
    const containerVariants = {
      default: 'border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-blue-200',
      filled: 'border-transparent bg-gray-100 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-blue-200',
      outlined: 'border-gray-300 bg-transparent focus-within:border-blue-500 focus-within:ring-blue-200'
    };

    // Estados para el contenedor
    const containerStates = {
      error: 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200',
      disabled: 'opacity-50 cursor-not-allowed'
    };

    // Tamaños para el contenedor
    const containerSizes = {
      sm: 'h-9',
      md: 'h-11',
      lg: 'h-12'
    };

    // Clases para el input
    const inputBaseStyles = 'w-full bg-transparent border-none outline-none placeholder-gray-400 disabled:cursor-not-allowed';

    // Tamaños para el input
    const inputSizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base'
    };

    // Clases para el contenedor
    const containerClasses = twMerge(
      clsx(
        containerBaseStyles,
        containerVariants[variant],
        containerSizes[inputSize],
        {
          [containerStates.error]: error,
          [containerStates.disabled]: disabled || isLoading
        },
        containerClassName
      )
    );

    // Clases para el input
    const inputClasses = twMerge(
      clsx(
        inputBaseStyles,
        inputSizes[inputSize],
        {
          'pl-10': leftIcon,
          'pr-10': rightIcon || isLoading,
          'text-red-900 placeholder-red-300': error,
          'cursor-not-allowed': disabled || isLoading
        },
        className
      )
    );

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              'block text-sm font-medium transition-colors',
              {
                'text-red-700': error,
                'text-gray-700': !error,
                'opacity-50': disabled || isLoading
              }
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Contenedor del input */}
        <div className={containerClasses}>
          {/* Icono izquierdo */}
          {leftIcon && (
            <span className={clsx(
              'absolute left-3 flex items-center justify-center',
              {
                'text-gray-400': !error,
                'text-red-500': error,
                'opacity-50': disabled || isLoading
              }
            )}>
              {leftIcon}
            </span>
          )}

          {/* Input principal */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled || isLoading}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Icono derecho o spinner de loading */}
          {(rightIcon || isLoading) && (
            <span className={clsx(
              'absolute right-3 flex items-center justify-center',
              {
                'text-gray-400': !error && !isLoading,
                'text-red-500': error && !isLoading,
                'opacity-50': disabled
              }
            )}>
              {isLoading ? (
                <Spinner />
              ) : (
                rightIcon
              )}
            </span>
          )}
        </div>

        {/* Mensaje de error o ayuda */}
        {(error || helperText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={clsx(
              'text-sm transition-colors',
              {
                'text-red-600': error,
                'text-gray-500': !error && helperText,
                'opacity-50': disabled || isLoading
              }
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Componente Spinner interno
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export { Input };




/**
 * 
 Input Básico
<Input
  label="Email"
  placeholder="tu@email.com"
  type="email"
  required
/>

//Input con Icono y Validación
<Input
  label="Email"
  type="email"
  leftIcon={<Mail size={16} />}
  placeholder="tu@email.com"
  required
/>

<Input
  label="Contraseña"
  type="password"
  leftIcon={<Lock size={16} />}
  placeholder="••••••••"
  error="La contraseña es muy corta"
/>

<Input
  placeholder="Buscar..."
  leftIcon={<Search size={16} />}
  variant="filled"
/>



//Diferentes Tamaños y Estados
<Input
  label="Small Input"
  size="sm"
  placeholder="Small size"
/>

<Input
  label="Large Input"
  size="lg"
  placeholder="Large size"
  disabled
/>

<Input
  label="With Right Icon"
  rightIcon={<Check size={16} />}
  placeholder="Con icono derecho"
/>


// Input con clases personalizadas
<Input
  label="Custom Input"
  className="font-mono" // ← Solo para el input
  containerClassName="shadow-lg" // ← Para el contenedor
  placeholder="Personalizado"
/>

// Input con gradient border
<Input
  label="Gradient Border"
  containerClassName="bg-gradient-to-r from-blue-500 to-purple-500 p-0.5"
  className="bg-white"
  placeholder="Con borde gradient"
/>
 */