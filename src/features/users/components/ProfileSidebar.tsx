// src/components/profile/ProfileSidebar.tsx
import { UserProfile } from '@/features/users/types/types';

interface ProfileSidebarProps {
  user: UserProfile;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const getExpertiseLevelText = (level: string) => {
    const levels = {
      beginner: 'Principiante',
      intermediate: 'Intermedio', 
      advanced: 'Avanzado',
      professional: 'Profesional'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4">Información</h3>
        
        


        {/* Especialidades */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Especialidades</h4>
          <div className="flex flex-wrap gap-2">
            {user.specialties.map(specialty => (
              <span key={specialty} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        {/* Ubicación */}
        {user.location && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-1">Ubicación</h4>
            <p className="text-gray-600">{user.location}</p>
          </div>
        )}
        
        {/* Nivel de experiencia */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-1">Experiencia</h4>
          <p className="text-gray-600 capitalize">{getExpertiseLevelText(user.expertiseLevel)}</p>
        </div>
        
        {/* Fecha de ingreso */}
        <div>
          <h4 className="font-medium text-gray-900 mb-1">Miembro desde</h4>
          <p className="text-gray-600">{new Date(user.joinedDate).toLocaleDateString('es-ES')}</p>
        </div>
      </div>

      {/* Herramientas */}
      {user.tools.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Herramientas principales</h3>
          <div className="flex flex-wrap gap-2">
            {user.tools.map(tool => (
              <span key={tool} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Redes sociales */}
      {user.socialLinks && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Redes sociales</h3>
          <div className="space-y-2">
            {user.socialLinks.instagram && (
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📷</span>
                <span>{user.socialLinks.instagram}</span>
              </div>
            )}
            {user.socialLinks.youtube && (
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🎥</span>
                <span>{user.socialLinks.youtube}</span>
              </div>
            )}
            {user.socialLinks.github && (
              <div className="flex items-center text-gray-600">
                <span className="mr-2">💻</span>
                <span>{user.socialLinks.github}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}