import { ProjectCard } from '@/features/users/components/ProjectCard';
import { TutorialCard } from '@/features/users/components/TutorialCard';
import { ProfileLayout, mockUser, mockProjects, mockTutorials } from '@/features/users/components/layoutProfile';

export default async function ProfilePage() {
    return (
        <ProfileLayout>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Acerca de mí</h2>
                <p className="text-gray-700 leading-relaxed">
                    {mockUser.bio}
                </p>

                {/* Información adicional */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {mockUser.website && (
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <a href={mockUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {mockUser.website.replace('https://', '')}
                            </a>
                        </div>
                    )}
                </div>
            </div>
            {/* Contenido principal */}
            <div className="lg:col-span-2">
                {/* Proyectos recientes */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Proyectos Recientes</h2>
                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                            Ver todos →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Proyectos recientes */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Tutoriales Recientes</h2>
                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                            Ver todos →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockTutorials.map(tutorial => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                </div>

                {/* Actividad reciente */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-6">Actividad Reciente</h2>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600">✓</span>
                            </div>
                            <div>
                                <p className="text-gray-900">
                                    Completó el proyecto <span className="font-medium">Mesa de centro moderna</span>
                                </p>
                                <p className="text-gray-500 text-sm">Hace 2 días</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600">📝</span>
                            </div>
                            <div>
                                <p className="text-gray-900">
                                    Publicó un nuevo tutorial sobre <span className="font-medium">Técnicas de lijado</span>
                                </p>
                                <p className="text-gray-500 text-sm">Hace 1 semana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </ProfileLayout>
    );
}