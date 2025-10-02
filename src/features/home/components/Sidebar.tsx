// src/components/instagram/InstagramSidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlusSquare } from 'lucide-react';
import type { Suggestion } from '@/features/home/types/posts';

const currentUser = {
  username: 'tu_usuario',
  name: 'Tu Nombre',
  fullName: 'Tu Nombre Completo'
};

const suggestions: Suggestion[] = [
  { id: '1', username: 'laura_design', avatar: '/avatars/7.jpg', mutualFollowers: 3 },
  { id: '2', username: 'miguel_photo', avatar: '/avatars/8.jpg', mutualFollowers: 8 },
  { id: '3', username: 'sofia_travel', avatar: '/avatars/9.jpg', mutualFollowers: 2 },
  { id: '4', username: 'david_fit', avatar: '/avatars/10.jpg', mutualFollowers: 5 },
  { id: '5', username: 'elena_art', avatar: '/avatars/11.jpg', mutualFollowers: 1 },
];

const footerLinks = [
  'Información', 'Ayuda', 'Prensa', 'API', 'Empleo', 'Privacidad',
  'Condiciones', 'Ubicaciones', 'Idioma', 'Verificación',
  'Meta'
];

export function Sidebar() {
  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Perfil del Usuario */}
        <div className="flex items-center justify-between">
          <Link href="/profile" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-gray-300 transition-all">
              <span className="text-white font-semibold text-xl">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">
                {currentUser.username}
              </div>
              <div className="text-gray-500 text-sm truncate">
                {currentUser.fullName}
              </div>
            </div>
          </Link>
          <button className="text-blue-500 text-xs font-semibold hover:text-blue-600 transition-colors">
            Cambiar
          </button>
        </div>


        {/* Sugerencias para ti - Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-500 text-sm">
            Sugerencias para ti
          </h3>
          <Link href="/explore/people" className="text-gray-900 text-xs font-semibold hover:text-gray-600 transition-colors">
            Ver todo
          </Link>
        </div>

        {/* Lista de Sugerencias */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between group">
              <Link 
                href={`/${suggestion.username}`} 
                className="flex items-center space-x-3 flex-1 min-w-0"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {suggestion.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">
                    {suggestion.username}
                  </div>
                  <div className="text-gray-500 text-xs truncate">
                    Sugerido para ti
                  </div>
                </div>
              </Link>
              <button className="text-blue-500 text-xs font-semibold hover:text-blue-600 transition-colors px-2 py-1">
                Seguir
              </button>
            </div>
          ))}
        </div>

        
        {/* Mensaje de fin de feed */}
        <div className="text-center pt-4">
          <div className="text-gray-400 text-xs">
            ¿Tienes un proyecto para compartir? ¡La comunidad espera verlo!
          </div>

          <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">
            <PlusSquare className="inline w-4 h-4 mr-2" />
            Crear Proyecto
          </button>
        </div>

        {/* Enlaces de Navegación */}
        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {footerLinks.slice(0, 6).map((link) => (
              <Link 
                key={link}
                href="#" 
                className="text-gray-400 text-xs hover:text-gray-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {footerLinks.slice(6).map((link) => (
              <Link 
                key={link}
                href="#" 
                className="text-gray-400 text-xs hover:text-gray-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-gray-400 text-xs">
            © 2025 MAKERS FROM GROUP GEORGE
          </div>
        </div>
      </div>
    </div>
  );
}