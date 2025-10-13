import { Step } from '@/features/projects/types/project';

interface StepResourcesProps {
    step: Step;
}

export default function StepResources({ step }: StepResourcesProps) {
    return (
        <div className="space-y-6">
            {/* Herramientas */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🛠️ Herramientas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.resources.tools.map((tool, index) => (
                        <div key={index} className="group flex items-center gap-3 py-2 px-3 rounded-lg transition-all hover:bg-orange-50">
                            <div className="w-1.5 h-1.5 bg-orange-300 rounded-full group-hover:bg-orange-500 transition-colors flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-orange-700 transition-colors">
                                    {tool.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    {tool.quantity && <span>{tool.quantity}</span>}
                                    {tool.notes && tool.quantity && <span> • </span>}
                                    {tool.notes && <span>{tool.notes}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Materiales */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📦 Materiales Necesarios
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.resources.materials.map((material, index) => (
                        <div key={index} className="group flex items-center gap-3 py-2 px-3 rounded-lg transition-all hover:bg-green-50">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-green-600 transition-colors flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                                    {material.name}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                    {material.quantity && <span>{material.quantity}</span>}
                                    {material.cost && (
                                        <span className="font-semibold text-green-600">
                                            ${material.cost}
                                        </span>
                                    )}
                                </div>
                                {material.notes && (
                                    <div className="text-sm text-gray-500 mt-1">
                                        {material.notes}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>




            {/* Seguridad */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    ⚠️ Equipo de Seguridad
                </h3>
                <div className={`p-4 rounded-lg border ${step.resources.safety.level === 'high' ? 'bg-red-50 border-red-200' :
                    step.resources.safety.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Nivel de riesgo:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${step.resources.safety.level === 'high' ? 'bg-red-100 text-red-800' :
                            step.resources.safety.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                            {step.resources.safety.level === 'high' ? 'Alto' :
                                step.resources.safety.level === 'medium' ? 'Medio' : 'Bajo'}
                        </span>
                    </div>

                    {step.resources.safety.equipment.length > 0 && (
                        <div className="mb-3">
                            <div className="font-medium text-gray-900 mb-2">Equipo de protección requerido:</div>
                            <div className="flex flex-wrap gap-2">
                                {step.resources.safety.equipment.map((item, index) => (
                                    <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {step.resources.safety.warnings.length > 0 && (
                        <div>
                            <div className="font-medium text-gray-900 mb-2">Advertencias importantes:</div>
                            <ul className="space-y-1">
                                {step.resources.safety.warnings.map((warning, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-red-500 mt-1">•</span>
                                        {warning}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Espacio de trabajo */}
            {step.resources.workspace.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        🏭 Requisitos del Espacio de Trabajo
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <ul className="space-y-2">
                            {step.resources.workspace.map((requirement, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-blue-500 mt-1">•</span>
                                    {requirement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}