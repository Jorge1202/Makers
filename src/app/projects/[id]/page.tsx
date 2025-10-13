import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout/layoutHeader';
import ProjectOverview from '@/features/projects/components/ProjectOverview';
import StepNavigation from '@/features/projects/components/StepNavigation';
import StepView from '@/features/projects/components/StepView';

async function getProject(id: string) {
    try {
        // En desarrollo, usamos los mock data
        const { mockProjects } = await import('@/features/projects/data/mockData');
        const project = mockProjects.find(p => p.id === id);
        return project || null;
    } catch (error) {
        return null;
    }
}

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProjectPage({ params, searchParams }: Props) {
    const project = await getProject(params.id);

    if (!project) {
        notFound();
    }

    // Determinar qué vista mostrar basado en searchParams
    const view = searchParams.view as string || 'overview';
    const stepId = searchParams.step as string;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* Header de navegación */}
                {/* <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center space-x-2 text-sm text-gray-500">
                            <Link href="/" className="hover:text-gray-700">Inicio</Link>
                            <span>/</span>
                            <a href={`/${project.user.username}`} className="hover:text-gray-700">
                                {project.user.name}
                            </a>
                            <span>/</span>
                            <a href={`/${project.user.username}/projects`} className="hover:text-gray-700">
                                Proyectos
                            </a>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">{project.title}</span>
                        </nav>
                    </div>
                </div> */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar de navegación */}
                        <div className="lg:col-span-1">
                            <StepNavigation
                                project={project}
                                currentView={view}
                                currentStepId={stepId}
                            />
                        </div>

                        {/* Contenido principal */}
                        <div className="lg:col-span-3">
                            {view === 'overview' && <ProjectOverview project={project} />}
                            {view === 'step' && stepId && (
                                <StepView
                                    project={project}
                                    stepId={stepId}
                                />
                            )}
                            {view === 'final' && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultado Final</h2>
                                    {/* Aquí iría el componente de resultado final */}
                                    <p>Vista de resultado final en desarrollo...</p>
                                </div>
                            )}
                            {view === 'conclusion' && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusión</h2>
                                    {/* Aquí iría el componente de reflexiones */}
                                    <p>Conclusión del proyecto...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

