'use client';

import Link from 'next/link';
import { Project } from '@/features/projects/types/project';
import { cn } from '@/features/projects/utils/utils';

interface StepNavigationProps {
    project: Project;
    currentView: string;
    currentStepId?: string;
}

export default function StepNavigation({ project, currentView, currentStepId }: StepNavigationProps) {
    const getStepStatusColor = (status: string) => {
        const colors = {
            'not-started': 'bg-gray-200',
            'in-progress': 'bg-blue-500',
            'completed': 'bg-green-500',
            'skipped': 'bg-yellow-500'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-200';
    };

    const getStepStatusText = (status: string) => {
        const texts = {
            'not-started': 'No iniciado',
            'in-progress': 'En progreso',
            'completed': 'Completado',
            'skipped': 'Omitido'
        };
        return texts[status as keyof typeof texts] || status;
    };

    const handleReplicateProject = () => {
        // Aquí puedes implementar la lógica para replicar el proyecto
        console.log('Replicando proyecto:', project.id);

        // Ejemplos de lo que podrías hacer:
        // 1. Crear una copia del proyecto para el usuario actual
        // 2. Redirigir a un formulario de creación de proyecto con datos prellenados
        // 3. Abrir un modal de confirmación
        // 4. Incrementar el contador de réplicas

        alert(`¡Vas a replicar el proyecto "${project.title}"! Esta funcionalidad se implementará próximamente.`);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            {/* Información del proyecto */}
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>por</span>
                    <img
                        src={project.user.avatar}
                        alt={project.user.name}
                        className="w-5 h-5 rounded-full"
                    />
                    <span className="font-medium">{project.user.name}</span>
                </div>
            </div>

            {/* Botón de Replicar Proyecto */}
            {/* Botón de Replicar - CON ICONO DESTACADO */}
            <div className="mb-6">
                <button
                    onClick={handleReplicateProject}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-lg">⚡</span>
                    </div>
                    <div className="text-left">
                        <div className="text-sm">¡Hazlo tú mismo!</div>
                        <div className="text-xs opacity-90">Replicar este proyecto</div>
                    </div>
                </button>
            </div>

            {/* Navegación principal */}
            <nav className="space-y-1">
                {/* Vista General */}
                <Link
                    href={`/projects/${project.id}?view=overview`}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        currentView === 'overview'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                    )}
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        🏠
                    </div>
                    <span>Vista General</span>
                </Link>

                {/* Proceso de Construcción */}
                <div className="pt-2">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900">
                        <div className="w-6 h-6 flex items-center justify-center">
                            🛠️
                        </div>
                        <span>Proceso de Construcción</span>
                    </div>

                    <div className="ml-2 space-y-1 border-l border-gray-200 pl-4">
                        {project.steps.map((step) => (
                            <div key={step.id} className="space-y-1">
                                {/* Paso principal */}
                                <Link
                                    href={`/projects/${project.id}?view=step&step=${step.id}`}
                                    className={cn(
                                        'flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors group',
                                        currentStepId === step.id
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    )}
                                >
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <div className={cn(
                                            'w-2 h-2 rounded-full flex-shrink-0',
                                            getStepStatusColor(step.status)
                                        )} />
                                        <span className="truncate">
                                            {step.order}. {step.title}
                                        </span>
                                    </div>
                                    {/* {step.technical.critical && (
                                        <span className="text-xs text-red-500 flex-shrink-0" title="Paso crítico">
                                            ⭐
                                        </span>
                                    )} */}
                                </Link>

                                {/* Subnavegación del paso */}
                                {currentStepId === step.id && (
                                    <div className="ml-4 space-y-1">
                                        {[
                                            { id: 'instructions', name: 'Instrucciones', icon: '📝' },
                                            { id: 'resources', name: 'Recursos', icon: '🛠️' },
                                            { id: 'lessons', name: 'Consejos', icon: '📈' },

                                            // { id: 'finishes', name: 'Acabados', icon: '🎨' },
                                            // { id: 'quality', name: 'Control Calidad', icon: '🔍' },
                                            // { id: 'technical', name: 'Metadatos', icon: '🏷️' },
                                        ].map((section) => (
                                            <Link
                                                key={section.id}
                                                href={`/projects/${project.id}?view=step&step=${step.id}&section=${section.id}`}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                            >
                                                <span>{section.icon}</span>
                                                <span>{section.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resultado Final */}
                <Link
                    href={`/projects/${project.id}?view=final`}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        currentView === 'final'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                    )}
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        📊
                    </div>
                    <span>Resultado Final</span>
                </Link>

                {/* Reflexiones */}
                <Link
                    href={`/projects/${project.id}?view=conclusion`}
                    className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        currentView === 'conclusion'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                    )}
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        🤔
                    </div>
                    <span>Conclusión</span>
                </Link>
            </nav>

            {/* Información rápida del proyecto */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                        <div className="font-bold text-gray-900">{project.likes}</div>
                        <div className="text-gray-500">Likes</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-900">{project.completionCount}</div>
                        <div className="text-gray-500">Réplicas</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-900">{project.views}</div>
                        <div className="text-gray-500">Vistas</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-900">{project.saves}</div>
                        <div className="text-gray-500">Guardados</div>
                    </div>
                </div>
            </div>
        </div>
    );
}