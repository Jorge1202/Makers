// src/app/[username]/projects/page.tsx
import { ProjectCard } from '@/features/users/components/ProjectCard';
import { ProfileLayout, mockProjects } from '@/features/users/components/layoutProfile';

// Datos mock (en un archivo separado sería ideal)
export default async function ProjectsPage() {
    return (
        <ProfileLayout>
            {/* Contenido principal */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Header de proyectos */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
                            <p className="text-gray-600 mt-1">
                                {mockProjects.length} proyectos publicados
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex items-center space-x-4">
                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option value="all">Todos los estados</option>
                                <option value="completed">Completados</option>
                                <option value="in-progress">En progreso</option>
                                <option value="planning">Planificación</option>
                            </select>

                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <option value="newest">Más recientes</option>
                                <option value="oldest">Más antiguos</option>
                                <option value="popular">Más populares</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid de proyectos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {mockProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-center items-center space-x-2 mt-8">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            Anterior
                        </button>
                        <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</span>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}