import { Project } from '@/features/projects/types/project';
import { formatTime } from '@/features/projects/utils/utils';

interface ProjectOverviewProps {
    project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
    const totalEstimatedTime = project.steps.reduce((total, step) => total + step.instructions.estimatedTime, 0);
    const completedSteps = project.steps.filter(step => step.status === 'completed').length;
    const progressPercentage = (completedSteps / project.steps.length) * 100;

    const totalMaterialCost = project.planning.materials.reduce((total, material) =>
        total + (material.cost || 0), 0
    );

    return (
        <div className="space-y-8">
            {/* Header Principal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-6">
                        <span className={`
              px-4 py-2 rounded-full text-sm font-medium text-center
              ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'}
            `}>
                            {project.status === 'completed' ? '✅ Completado' :
                                project.status === 'in-progress' ? '🔄 En progreso' : '📋 Planificación'}
                        </span>
                        <span className={`
              px-4 py-2 rounded-full text-sm font-medium text-center
              ${project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'}
            `}>
                            {project.difficulty === 'beginner' ? '👶 Principiante' :
                                project.difficulty === 'intermediate' ? '👨‍🎓 Intermedio' : '👨‍🔬 Avanzado'}
                        </span>
                    </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso general del proyecto</span>
                        <span>{completedSteps} de {project.steps.length} pasos completados</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Métricas rápidas */}
                <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{formatTime(totalEstimatedTime)}</div>
                        <div className="text-sm text-gray-600 mt-1">Tiempo total</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-2xl font-bold text-green-600">${project.planning.budget.estimated}</div>
                        <div className="text-sm text-gray-600 mt-1">Presupuesto</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">{project.steps.length}</div>
                        <div className="text-sm text-gray-600 mt-1">Pasos</div>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
                <div className='space-y-8'>
                    {/* Resumen Ejecutivo */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            📋 Introducción
                        </h2>
                        <div className="prose prose-gray max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {project.fullDescription}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* Grid Principal - 2 Columnas */}
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 ">

                {/* COLUMNA IZQUIERDA */}
                <div className="space-y-8">

                    {/* Objetivos del Proyecto */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            🎯 Objetivos
                        </h2>
                        <div className="space-y-4">
                            {project.objectives.map((objective, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{objective}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Presupuesto */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            💰 Presupuesto
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-900">Total estimado:</span>
                                    <span className="text-2xl font-bold text-green-600">
                                        ${project.planning.budget.estimated}
                                    </span>
                                </div>
                                {project.planning.budget.actual && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">Costo real:</span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${project.planning.budget.actual}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Desglose por Categoría</h3>
                                <div className="space-y-2">
                                    {project.planning.budget.breakdown.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{item.category}</span>
                                            <span className="font-semibold text-gray-900">${item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cronograma - FECHAS INTEGRADAS */}
                    {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            ⏰ Cronograma
                        </h2>
                        <div className="space-y-4">
                            {project.planning.timeline.map((phase, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{phase.phase}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                            <span>📅 {formatDate(phase.startDate)}</span>
                                            {phase.endDate && (
                                                <>
                                                    <span>→</span>
                                                    <span>{formatDate(phase.endDate)}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm">{phase.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                </div>
            </div>

            <hr />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className='space-y-8'>

                    {/* Herramientas - MINIMALISTA */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            🔧 Herramientas Requeridas
                        </h2>
                        <div className="divide-y divide-gray-100">
                            {project.planning.tools.map((tool, index) => (
                                <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-medium text-gray-900">{tool.name}</div>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                                {tool.quantity && <span>{tool.quantity}</span>}
                                                {tool.notes && <span>• {tool.notes}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://amazon.com/s?k=${encodeURIComponent(tool.name)}&tag=TU_CODIGO_AFILIADO`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap"
                                    >
                                        Comprar
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='space-y-8'>
                    {/* Materiales - MINIMALISTA */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            📦 Materiales e Insumos
                        </h2>
                        <div className="divide-y divide-gray-100">
                            {project.planning.materials.map((material, index) => (
                                <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium text-gray-900">{material.name}</div>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                                <span>{material.quantity}</span>
                                                {material.cost && (
                                                    <span className="font-semibold text-green-600">${material.cost}</span>
                                                )}
                                                {material.notes && (
                                                    <span className="text-gray-500">• {material.notes}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://amazon.com/s?k=${encodeURIComponent(material.name)}&tag=TU_CODIGO_AFILIADO`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-green-500 hover:text-white transition-colors whitespace-nowrap ml-4"
                                    >
                                        Comprar
                                    </a>
                                </div>
                            ))}
                        </div>

                        {totalMaterialCost > 0 && (
                            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Total estimado:</span>
                                    <span className="text-xl font-bold text-blue-600">${totalMaterialCost}</span>
                                </div>
                                <div className="text-sm opacity-90 mt-1">
                                    Costo estimado para todos los materiales listados
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

               {/* Información Adicional */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            ℹ️ Información Adicional
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">🏭 Espacio de Trabajo</h3>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-sm text-gray-700">{project.planning.workspace}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">🎯 Habilidades Requeridas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.steps.flatMap(step => step.technical.skills)
                                        .filter((skill, index, array) => array.indexOf(skill) === index)
                                        .slice(0, 8)
                                        .map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>

                            {project.inspiration.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">💡 Inspiración</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.inspiration.map((item, index) => (
                                            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


            <hr />
            {/* Vista Previa de Pasos - AL FINAL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Vista Previa del Proceso</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.steps.slice(0, 4).map((step) => (
                        <div key={step.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">
                                    {step.order}. {step.title}
                                </h3>
                                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${step.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'}
                `}>
                                    {step.status === 'completed' ? 'Completado' :
                                        step.status === 'in-progress' ? 'En progreso' : 'No iniciado'}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {step.instructions.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>⏱️ {formatTime(step.instructions.estimatedTime)}</span>
                                <span>🛠️ {step.resources.tools.length} herramientas</span>
                                {/* {step.technical.critical && (
                                    <span className="text-red-500">⭐ Crítico</span>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
                {project.steps.length > 4 && (
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">
                            +{project.steps.length - 4} pasos más en el proceso detallado...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}