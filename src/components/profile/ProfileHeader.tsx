// src/components/profile/ProfileHeader.tsx
import { UserProfile } from '@/lib/types/users/types';

interface ProfileHeaderProps {
  user: UserProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      {/* Imagen de portada */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {user.coverImage && (
          <img 
            src={user.coverImage} 
            alt="Portada" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Información del usuario */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 relative z-10">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="h-32 w-32 rounded-full border-4 border-white bg-white"
            />
          </div>
          
          {/* Información principal */}
          <div className="mt-4 md:mt-0 md:ml-6 flex-1 pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.displayName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              <button className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Seguir
              </button>
            </div>
            
            {/* Bio */}
            <p className="mt-2 text-gray-700">{user.bio}</p>
            
            {/* Estadísticas */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="text-center">
                <div className="font-bold text-gray-900">{user.stats.projectsCompleted}</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{user.stats.followers}</div>
                <div className="text-sm text-gray-600">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{user.stats.following}</div>
                <div className="text-sm text-gray-600">Siguiendo</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{user.stats.tutorialsCreated}</div>
                <div className="text-sm text-gray-600">Tutoriales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}