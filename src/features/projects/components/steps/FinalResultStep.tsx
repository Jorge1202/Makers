'use client';

import { Project } from '@/features/projects/types/project';
import { useState } from 'react';

interface FinalResultStepProps {
  formData: Project;
  updateFormData: (updates: Partial<Project>) => void;
}

export const FinalResultStep = ({ formData, updateFormData }: FinalResultStepProps) => {
  const [newMetric, setNewMetric] = useState({ name: '', expected: '', actual: '' });
  const [reflection, setReflection] = useState({
    whatWorked: [''],
    improvements: [''],
    advice: ['']
  });

  const handleAddMetric = () => {
    if (newMetric.name && newMetric.expected) {
      updateFormData({
        finalResult: {
          ...formData.finalResult,
          gallery: formData.finalResult?.gallery || [],
          costComparison: formData.finalResult?.costComparison || { estimated: 0, actual: 0 },          
          metrics: [
            ...(formData.finalResult?.metrics || []),
            { ...newMetric, actual: newMetric.actual || newMetric.expected }
          ]
        }
      });
      setNewMetric({ name: '', expected: '', actual: '' });
    }
  };

  const handleAddReflection = (field: keyof typeof reflection) => {
    setReflection(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateReflection = (field: keyof typeof reflection, index: number, value: string) => {
    setReflection(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const saveReflections = () => {
    updateFormData({
      reflections: {
        whatWorked: reflection.whatWorked.filter(item => item.trim() !== ''),
        improvements: reflection.improvements.filter(item => item.trim() !== ''),
        advice: reflection.advice.filter(item => item.trim() !== '')
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resultado Final y Reflexiones</h2>

      {/* Comparación de Costos */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Comparación de Costos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Costo Estimado ($)</label>
            <input
              type="number"
              value={formData.finalResult?.costComparison?.estimated || formData.planning.budget.estimated}
              onChange={(e) => updateFormData({
                finalResult: {
                  ...formData.finalResult,
                  gallery: formData.finalResult?.gallery || [],
                  costComparison: {
                    ...formData.finalResult?.costComparison,
                    actual: Number(e.target.value) || 0,
                    estimated: Number(e.target.value)
                  },
                  metrics: formData.finalResult?.metrics || []
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Costo Real ($)</label>
            <input
              type="number"
              value={formData.finalResult?.costComparison?.actual || ''}
              onChange={(e) => updateFormData({
                finalResult: {
                  ...formData.finalResult,
                  gallery: formData.finalResult?.gallery || [],
                  costComparison: {
                    ...formData.finalResult?.costComparison,
                    actual: Number(e.target.value) || 0,
                    estimated: Number(e.target.value)
                  },
                  metrics: formData.finalResult?.metrics || []
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas del Resultado</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
          <input
            type="text"
            placeholder="Nombre métrica"
            value={newMetric.name}
            onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Valor esperado"
            value={newMetric.expected}
            onChange={(e) => setNewMetric({ ...newMetric, expected: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Valor real"
            value={newMetric.actual}
            onChange={(e) => setNewMetric({ ...newMetric, actual: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddMetric}
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        
        {formData.finalResult?.metrics?.map((metric, index) => (
          <div key={index} className="flex items-center justify-between border-b py-2">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <span className="font-medium">{metric.name}</span>
              <span className="text-gray-600">Esperado: {metric.expected}</span>
              <span className="text-green-600">Real: {metric.actual}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const newMetrics = formData.finalResult?.metrics?.filter((_, i) => i !== index) || [];
                updateFormData({
                  finalResult: { 
                    ...formData.finalResult, 
                    gallery: formData.finalResult?.gallery || [],
                    costComparison: {
                        ...formData.finalResult?.costComparison,
                        actual: formData.finalResult?.costComparison?.actual || 0,
                        estimated: formData.finalResult?.costComparison?.estimated || 0
                    },
                    metrics: newMetrics }
                });
              }}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Reflexiones */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Reflexiones Finales</h3>
        
        {/* Qué funcionó bien */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">¿Qué funcionó bien?</h4>
          {reflection.whatWorked.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateReflection('whatWorked', index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: La técnica de ensamblaje fue muy efectiva"
              />
              {reflection.whatWorked.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newItems = reflection.whatWorked.filter((_, i) => i !== index);
                    setReflection(prev => ({ ...prev, whatWorked: newItems }));
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddReflection('whatWorked')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Agregar punto
          </button>
        </div>

        {/* Mejoras para la próxima vez */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Mejoras para la próxima vez</h4>
          {reflection.improvements.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateReflection('improvements', index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Usar una herramienta diferente para..."
              />
              {reflection.improvements.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newItems = reflection.improvements.filter((_, i) => i !== index);
                    setReflection(prev => ({ ...prev, improvements: newItems }));
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddReflection('improvements')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Agregar mejora
          </button>
        </div>

        {/* Consejos para otros */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Consejos para otros creadores</h4>
          {reflection.advice.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateReflection('advice', index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Recomiendo empezar por..."
              />
              {reflection.advice.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newItems = reflection.advice.filter((_, i) => i !== index);
                    setReflection(prev => ({ ...prev, advice: newItems }));
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddReflection('advice')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Agregar consejo
          </button>
        </div>

        <button
          type="button"
          onClick={saveReflections}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Guardar Reflexiones
        </button>
      </div>
    </div>
  );
};