// src/components/profile/ProjectCard.tsx
import { Project } from '@/features/users/types/types';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusInfo = (status: string) => {
    const statusMap = {
      'planning': { text: 'Planificación', color: 'bg-gray-100 text-gray-800', emoji: '📋' },
      'in-progress': { text: 'En progreso', color: 'bg-blue-100 text-blue-800', emoji: '⚡' },
      'completed': { text: 'Completado', color: 'bg-green-100 text-green-800', emoji: '✅' },
      'paused': { text: 'Pausado', color: 'bg-yellow-100 text-yellow-800', emoji: '⏸️' },
      'abandoned': { text: 'Abandonado', color: 'bg-red-100 text-red-800', emoji: '❌' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.planning;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  const statusInfo = getStatusInfo(project.status);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.emoji} {statusInfo.text}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className={`font-medium ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty === 'easy' ? 'Fácil' : 
             project.difficulty === 'medium' ? 'Medio' : 'Difícil'}
          </span>
          <span>{project.likes} 👍</span>
        </div>
        
        {/* Tools */}
        {project.toolsUsed.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {project.toolsUsed.slice(0, 3).map(tool => (
                <span key={tool} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {tool}
                </span>
              ))}
              {project.toolsUsed.length > 3 && (
                <span className="text-gray-400 text-xs">+{project.toolsUsed.length - 3}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}