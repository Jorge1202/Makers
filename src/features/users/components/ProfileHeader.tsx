'use client'

import { useState } from 'react';
import { UserProfile } from '@/features/users/types/types';

interface ProfileHeaderProps {
  user: UserProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determinar si es el perfil propio
  const isMyProfile = false; // Esto vendría de la autenticación

  const menuItems = isMyProfile
    ? [
      {
        label: 'Editar perfil',
        icon: '',
        action: () => console.log('Editar')
      },
      {
        label: 'Gestionar proyectos',
        icon: '',
        action: () => console.log('Proyectos')
      },
      {
        label: 'Configuración',
        icon: '',
        action: () => console.log('Config')
      },
    ]
    : [  
      {
        label: 'Solicitar colaboración',
        icon: '',
        action: () => console.log('Colaborar')
      },
      {
        label: 'Compartir perfil',
        icon: '',
        action: () => console.log('Compartir')
      },
      {
        label: 'Reportar usuario',
        icon: '',
        action: () => console.log('Reportar')
      },
    ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      {/* Portada con overlay */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden h-48 bg-gradient-to-r from-gray-900 to-gray-700 relative overflow-hidden">
        {user.coverImage ? (
          <img
            src={user.coverImage}
            alt="Portada"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500" />
        )}

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Contenido del header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between -mt-20 relative z-10 pb-6 mt-2">

          {/* Sección izquierda: Avatar e información */}
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg"
                />
                {/* Indicador de estado en línea */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>

            {/* Información del usuario */}
            <div className="md:ml-6 md:mb-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-600 text-lg">@{user.username}</p>
                </div>

                {/* Badge de nivel de experiencia */}
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.expertiseLevel === 'professional'
                    ? 'bg-purple-100 text-purple-800'
                    : user.expertiseLevel === 'advanced'
                      ? 'bg-blue-100 text-blue-800'
                      : user.expertiseLevel === 'intermediate'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                    {user.expertiseLevel === 'professional' ? 'Profesional' :
                      user.expertiseLevel === 'advanced' ? 'Avanzado' :
                        user.expertiseLevel === 'intermediate' ? 'Intermedio' : 'Principiante'}
                  </span>
                </div>
              </div>

              {/* Bio */}
              {/* {user.bio && (
                <p className="mt-3 text-gray-700 max-w-2xl leading-relaxed">
                  {user.bio}
                </p>
              )} */}

              {/* Ubicación y website */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {user.location && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                )}

                {user.website && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {user.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección derecha: Acciones y estadísticas */}
          <div className="flex flex-col items-end space-y-4 mt-6 md:mt-0">
            {/* Botones de acción */}
            <div className="flex items-center space-x-3">
              {
                !isMyProfile && (
                  <>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Mensaje
                    </button>

                    <button className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Seguir
                    </button>
                  </>
                )
              } 

              {/* Botón de menú mejorado */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>

                {/* Menú desplegable */}
                {isMenuOpen && (
                  <>
                    {/* Overlay para cerrar al hacer click fuera */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {menuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            item.action();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}

                      {/* Separador */}
                      <div className="border-t border-gray-200 my-1"></div>

                      {/* Opción adicional según el contexto */}
                      {!isMyProfile && (
                        <button
                          onClick={() => {
                            console.log('Bloquear usuario');
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                        >
                          <span className="text-lg">🚫</span>
                          <span className="font-medium">Bloquear usuario</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="flex items-center space-x-6 rounded-lg px-4 py-3">
              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">{user.stats.projectsCompleted}</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>

              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">{user.stats.followers}</div>
                <div className="text-sm text-gray-600">Seguidores</div>
              </div>

              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">{user.stats.following}</div>
                <div className="text-sm text-gray-600">Siguiendo</div>
              </div>

              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">{user.stats.tutorialsCreated}</div>
                <div className="text-sm text-gray-600">Tutoriales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}