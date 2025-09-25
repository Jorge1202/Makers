/**
 * Componente Button reutilizable y personalizable
 * 
 * @component
 * @example
 * // Uso básico
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * // Con icono y loading
 * <Button 
 *   variant="secondary" 
 *   leftIcon={<PlusIcon />}
 *   isLoading={true}
 *   loadingText="Cargando..."
 * >
 *   Agregar
 * </Button>
 */
'use client'; // Indica que este es un componente de cliente

import React from 'react';
import { clsx } from 'clsx'; // Utilidad para combinar clases condicionalmente
import { twMerge } from 'tailwind-merge'; // Utilidad para fusionar clases de Tailwind

/**
 * Props del componente Button
 * Extiende todas las props nativas de un botón HTML
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Indica si el botón está en estado de carga */
  isLoading?: boolean;
  /** Texto alternativo durante el loading */
  loadingText?: string;
  /** Icono a mostrar a la izquierda del texto */
  leftIcon?: React.ReactNode;
  /** Icono a mostrar a la derecha del texto */
  rightIcon?: React.ReactNode;
  /** Si es true, renderiza children en lugar de button (útil para enlaces) */
  asChild?: boolean;
}

/**
 * Componente Button personalizable
 * 
 * Utiliza forwardRef para permitir el acceso directo al DOM element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary', // Valor por defecto: primary
      size = 'md', // Valor por defecto: medium
      isLoading = false, // Valor por defecto: no loading
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button', // Valor por defecto: type="button"
      asChild, // ✅ Esta prop se captura pero no se pasa al DOM
      ...props // Resto de props nativas del botón
    },
    ref // Ref para acceso directo al elemento
  ) => {
    // Estilos base comunes a todos los botones
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Mapeo de variantes visuales con sus clases de Tailwind
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-sm',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm'
    };

    // Mapeo de tamaños con sus clases de Tailwind
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5', // Small
      md: 'px-4 py-2 text-sm gap-2',     // Medium
      lg: 'px-6 py-3 text-base gap-2.5', // Large
      xl: 'px-8 py-4 text-lg gap-3'      // Extra Large
    };

    // Combina y fusiona todas las clases usando clsx y twMerge
    const classes = twMerge(
      clsx(
        baseStyles,        // Estilos base
        variants[variant], // Clases de la variante seleccionada
        sizes[size],       // Clases del tamaño seleccionado
        className          // Clases personalizadas adicionales
      )
    );

    // Si asChild es true, renderizamos directamente los children
    // Esto es útil para componentes como Next.js Link
    if (asChild) {
      return React.Children.only(children as React.ReactElement);
    }

    return (
      <button
        ref={ref} // Ref forwardeada al elemento button
        type={type} // Tipo de botón (button, submit, reset)
        className={classes} // Clases combinadas
        disabled={disabled || isLoading} // Deshabilitado si está loading o disabled
        {...props} // Spread de todas las props nativas
      >
        {isLoading ? (
          // Estado de loading: muestra spinner + texto
          <>
            <Spinner />
            {loadingText || children} {/* Texto de loading o texto normal */}
          </>
        ) : (
          // Estado normal: muestra iconos y children
          <>
            {leftIcon && !isLoading && (
              <span className="flex-shrink-0">{leftIcon}</span> // Icono izquierdo
            )}
            {children} {/* Contenido principal del botón */}
            {rightIcon && !isLoading && (
              <span className="flex-shrink-0">{rightIcon}</span> // Icono derecho
            )}
          </>
        )}
      </button>
    );
  }
);

// Define el displayName para mejor debugging en React DevTools
Button.displayName = 'Button';

/**
 * Componente Spinner interno para el estado de loading
 * 
 * @component
 * @private
 */
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    {/* Círculo de fondo del spinner */}
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    {/* Path de la animación del spinner */}
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export { Button };

/**############## Uso Básico */
// import { Button } from '@/components/ui/Button';
// // Botón primario
// <Button>Click me</Button>
// // Botón secundario
// <Button variant="secondary">Cancel</Button>
// // Botón outline
// <Button variant="outline">Edit</Button>

/**############## Combinando Props */
// import { Button } from '@/components/ui/Button';
// import { Download } from 'lucide-react';
// <Button
//   variant="outline"
//   size="lg"
//   leftIcon={<Download size={18} />}
//   className="w-full max-w-xs"
//   onClick={() => console.log('Download clicked')}
// >
//   Download Report
// </Button>

/**############## Como Enlace */
// import { Button } from '@/components/ui/Button';
// import Link from 'next/link';
// // Como enlace con Next.js Link
// <Button asChild>
//   <Link href="/dashboard">
//     Go to Dashboard
//   </Link>
// </Button>
// // Como enlace nativo
// <Button asChild>
//   <a href="/about" target="_blank">
//     About Us
//   </a>
// </Button>

/**############## Tamaños y Estados */
// import { Button } from '@/components/ui/Button';
// // Diferentes tamaños
// <Button size="sm">Small</Button>
// <Button size="md">Medium</Button>
// <Button size="lg">Large</Button>
// <Button size="xl">X-Large</Button>
// // Loading state
// <Button isLoading loadingText="Processing...">
//   Submit
// </Button>
// <Button isLoading variant="outline">
//   Loading...
// </Button>
// // Deshabilitado
// <Button disabled>Disabled</Button>

/**############## Con Iconos */
// import { Button } from '@/components/ui/Button';
// import { Plus, Trash2, Edit } from 'lucide-react';
// // Con icono izquierdo
// <Button leftIcon={<Plus size={16} />}>
//   Add Item
// </Button>
// // Con icono derecho
// <Button rightIcon={<Edit size={16} />}>
//   Edit
// </Button>
// // Botón de peligro con icono
// <Button variant="danger" leftIcon={<Trash2 size={16} />}>
//   Delete
// </Button>

