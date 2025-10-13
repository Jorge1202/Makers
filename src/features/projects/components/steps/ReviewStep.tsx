'use client';

import { Project } from '@/features/projects/types/project';

interface ReviewStepProps {
  formData: Project;
}

export const ReviewStep = ({ formData }: ReviewStepProps) => {
  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      paused: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const totalEstimatedCost = formData.planning.materials.reduce(
    (sum, material) => sum + (material.cost || 0), 0
  );

  const totalStepsTime = formData.steps.reduce(
    (sum, step) => sum + step.instructions.estimatedTime, 0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Revisar Proyecto</h2>

      {/* Sección de Medios */}
      {formData.featuredMedia.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Medios de Presentación ({formData.featuredMedia.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.featuredMedia.map((media, index) => (
              <div key={index} className="relative border rounded-lg overflow-hidden">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.caption || `Media ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <video
                    src={media.url}
                    className="w-full h-32 object-cover"
                    muted
                    playsInline
                  />
                )}
                <div className="p-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      media.type === 'image' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {media.type}
                    </span>
                    {media.isFeatured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Destacada
                      </span>
                    )}
                  </div>
                  {media.caption && (
                    <p className="text-xs mt-1 text-gray-600">{media.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información Básica */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Título:</strong> {formData.title}
          </div>
          <div>
            <strong>Estado:</strong>{' '}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(formData.status)}`}>
              {formData.status}
            </span>
          </div>
          <div>
            <strong>Dificultad:</strong>{' '}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(formData.difficulty)}`}>
              {formData.difficulty}
            </span>
          </div>
          <div>
            <strong>Categoría:</strong> {formData.category}
          </div>
          <div className="md:col-span-2">
            <strong>Descripción:</strong> {formData.description}
          </div>
          <div className="md:col-span-2">
            <strong>Objetivos:</strong>
            <ul className="list-disc list-inside mt-1">
              {formData.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Planificación */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Planificación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Presupuesto Estimado:</strong> ${formData.planning.budget.estimated}
          </div>
          <div>
            <strong>Costo Materiales:</strong> ${totalEstimatedCost}
          </div>
          <div>
            <strong>Materiales:</strong> {formData.planning.materials.length} items
          </div>
          <div>
            <strong>Herramientas:</strong> {formData.planning.tools.length} herramientas
          </div>
          <div className="md:col-span-2">
            <strong>Fases del Proyecto:</strong>
            <ul className="mt-1 space-y-2">
              {formData.planning.timeline.map((phase, index) => (
                <li key={index} className="flex justify-between">
                  <span>{phase.phase}</span>
                  <span className="text-gray-600">{phase.startDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Proceso */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Proceso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Total Pasos:</strong> {formData.steps.length}
          </div>
          <div>
            <strong>Tiempo Total Estimado:</strong> {Math.round(totalStepsTime / 60)} horas
          </div>
          <div className="md:col-span-2">
            <strong>Pasos:</strong>
            <ol className="mt-1 space-y-2">
              {formData.steps.map((step, index) => (
                <li key={step.id} className="flex justify-between items-center">
                  <span>
                    {index + 1}. {step.title}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(step.status)}`}>
                      {step.status}
                    </span>
                  </span>
                  <span className="text-gray-600">{step.instructions.estimatedTime} min</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Resultado Final */}
      {(formData.finalResult?.metrics || formData.finalResult?.costComparison) && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resultado Final</h3>
          {formData.finalResult?.costComparison && (
            <div className="mb-4">
              <strong>Comparación de Costos:</strong>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div>Estimado: ${formData.finalResult.costComparison.estimated}</div>
                <div>Real: ${formData.finalResult.costComparison.actual || 'N/A'}</div>
              </div>
            </div>
          )}
          {formData.finalResult?.metrics && formData.finalResult.metrics.length > 0 && (
            <div>
              <strong>Métricas:</strong>
              <ul className="mt-1 space-y-1">
                {formData.finalResult.metrics.map((metric, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{metric.name}:</span>
                    <span>
                      {metric.expected} → {metric.actual}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Resumen Final */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Resumen del Proyecto</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formData.steps.length}</div>
            <div className="text-blue-800">Pasos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formData.planning.materials.length}</div>
            <div className="text-blue-800">Materiales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round(totalStepsTime / 60)}</div>
            <div className="text-blue-800">Horas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">${totalEstimatedCost}</div>
            <div className="text-blue-800">En Materiales</div>
          </div>
        </div>
      </div>
    </div>
  );
};