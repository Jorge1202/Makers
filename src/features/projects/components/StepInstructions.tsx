'use client';

import { useState } from 'react';
import { Step } from '@/features/projects/types/project';
import { formatTime } from '@/features/projects/utils/utils';

interface StepInstructionsProps {
  step: Step;
}

export default function StepInstructions({ step }: StepInstructionsProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);

  return (
    <div className="space-y-8">
      {/* Header del paso con información clave */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Paso {step.order}: {step.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              ⏱️ {formatTime(step.instructions.estimatedTime)}
            </span>
            {/* {step.technical.critical && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                ⭐ Paso Crítico
              </span>
            )} */}
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          {step.instructions.description}
        </p>
      </div>

      {/* Galería principal de medios */}
      {step.instructions.media.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📸 Visuales de Referencia</h2>
          <div className="space-y-4">
            {/* Media principal */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              {step.instructions.media[selectedMedia].type === 'video' ? (
                <div className="relative">
                  <video
                    src={step.instructions.media[selectedMedia].url}
                    controls
                    className="w-full h-96 object-cover"
                    poster={step.instructions.media[selectedMedia].thumbnail}
                  />
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    🎥 Video
                  </div>
                </div>
              ) : (
                <img
                  src={step.instructions.media[selectedMedia].url}
                  alt={step.instructions.media[selectedMedia].caption || `Paso ${step.order} - ${step.title}`}
                  className="w-full h-96 object-cover"
                />
              )}
            </div>
            
            {/* Caption y descripción */}
            {step.instructions.media[selectedMedia].caption && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium">
                  💡 {step.instructions.media[selectedMedia].caption}
                </p>
              </div>
            )}

            {/* Miniaturas de galería */}
            {step.instructions.media.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Más visuales de este paso:</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {step.instructions.media.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMedia(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 transition-all ${
                        selectedMedia === index 
                          ? 'border-blue-500 shadow-md' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative">
                          {media.thumbnail ? (
                            <img
                              src={media.thumbnail}
                              alt={`Miniatura ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-gray-500 text-2xl">🎥</span>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                            <span className="text-white text-lg">▶</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={media.url}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
           
      {/* Documentación detallada del proceso */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📝 Proceso Detallado Paso a Paso</h2>
        
        <div className="space-y-6">
          {step.instructions.substeps.map((substep, index) => (
            <div key={index} className="flex items-start gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              {/* Número del subpaso */}
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                {index + 1}
              </div>
              
              {/* Contenido del subpaso */}
              <div className="flex-1">
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {substep}
                  </div>
                </div>
                
                {/* Puntos clave (si hay tips específicos para este subpaso) */}
                {(step.lessons.tips[index] || step.lessons.mistakes[index]) && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.lessons.tips[index] && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-800 font-medium mb-1">
                          <span>💡</span>
                          <span>Consejo Práctico</span>
                        </div>
                        <p className="text-green-700 text-sm">{step.lessons.tips[index]}</p>
                      </div>
                    )}
                    {step.lessons.mistakes[index] && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-800 font-medium mb-1">
                          <span>⚠️</span>
                          <span>Evitar Este Error</span>
                        </div>
                        <p className="text-red-700 text-sm">{step.lessons.mistakes[index]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertencias de seguridad destacadas */}
      {step.resources.safety.warnings.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
            ⚠️ Advertencias de Seguridad Importantes
          </h3>
          <div className="space-y-3">
            {step.resources.safety.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  !
                </div>
                <p className="text-red-800 font-medium">{warning}</p>
              </div>
            ))}
          </div>
          {step.resources.safety.equipment.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-red-900 mb-2">Equipo de protección requerido:</h4>
              <div className="flex flex-wrap gap-2">
                {step.resources.safety.equipment.map((item, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resumen de verificación rápida */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          ✅ Verificación Rápida del Paso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Puntos a Verificar:</h4>
            <ul className="space-y-1">
              {step.quality.checkpoints.slice(0, 3).map((checkpoint, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    checkpoint.verified 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    {checkpoint.verified && '✓'}
                  </div>
                  {checkpoint.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Mediciones Clave:</h4>
            <ul className="space-y-1">
              {step.quality.measurements.slice(0, 3).map((measurement, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{measurement.part}:</span> {measurement.dimension}
                  {measurement.tolerance && ` (±${measurement.tolerance})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}