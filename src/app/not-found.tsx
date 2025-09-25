// 'use client';

import Link from 'next/link';
// import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/Button';
// import { ClientButton } from '@/components/shared/ClientButton';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  // const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icono o ilustración */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <div className="w-24 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
        </div>

        {/* Título y descripción */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          ¡Ups! Página no encontrada
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          La página que estás buscando no existe o ha sido movida a otra ubicación. 
          Revisa la URL o navega por nuestras secciones.
        </p>

        {/* Código de error para desarrolladores */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-8">
          <code className="text-sm text-gray-600 dark:text-gray-300">
            Error: 404 - Not Found
          </code>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">      

          <Button size="lg" leftIcon={<Home size={16} />} className="flex items-center gap-2">
              <Link href="/">
              Volver al Inicio
            </Link>
          </Button>
          
            
        </div>

        {/* Enlaces útiles adicionales */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿Buscas algo específico?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/cursos" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              Todos los cursos
            </Link>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              Blog
            </Link>
            <Link href="/contacto" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              Contacto
            </Link>
            <Link href="/soporte" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// // Opcional: Metadata para la página 404
// export const metadata = {
//   title: 'Página no encontrada - 404 | Makers',
//   description: 'La página que buscas no existe en nuestra plataforma de cursos.',
//   robots: 'noindex, nofollow', // Importante para SEO
// };