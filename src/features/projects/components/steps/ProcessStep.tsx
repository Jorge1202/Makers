'use client';

import { Project, Step, Tool, Material, SafetyInfo } from '@/features/projects/types/project';
import { useState } from 'react';

interface ProcessStepProps {
  formData: Project;
  updateFormData: (updates: Partial<Project>) => void;
  addStep: (step: Step) => void;
  updateStep: (index: number, step: Step) => void;
  removeStep: (index: number) => void;
}

export const ProcessStep = ({ 
  formData, 
  addStep,
  updateStep,
  removeStep
}: ProcessStepProps) => {
  const [newStep, setNewStep] = useState<Partial<Step>>({
    title: '',
    instructions: {
      description: '',
      estimatedTime: 0,
      media: [],
      substeps: ['']
    },
    resources: {
      tools: [],
      materials: [],
      safety: {
        level: 'low',
        equipment: [],
        warnings: []
      },
      workspace: []
    },
    technical: {
      skills: [],
      techniques: [],
      difficulty: 'low',
      critical: false
    }
  });

  const handleAddStep = () => {
    if (newStep.title && newStep.instructions?.description) {
      const completeStep: Step = {
        id: Math.random().toString(36).substr(2, 9),
        order: formData.steps.length,
        status: 'not-started',
        title: newStep.title,
        instructions: {
          description: newStep.instructions.description,
          estimatedTime: newStep.instructions.estimatedTime || 0,
          media: [],
          substeps: newStep.instructions.substeps.filter(step => step.trim() !== '')
        },
        resources: {
          tools: [],
          materials: [],
          safety: {
            level: 'low',
            equipment: [],
            warnings: []
          },
          workspace: []
        },
        technical: {
          skills: [],
          techniques: [],
          difficulty: 'low',
          critical: false
        },
        lessons: {
          whatWorked: [],
          improvements: [],
          tips: [],
          mistakes: []
        },
        quality: {
          checkpoints: [],
          tests: [],
          measurements: [],
          tolerance: ''
        }
      };
      addStep(completeStep);
      setNewStep({
        title: '',
        instructions: {
          description: '',
          estimatedTime: 0,
          media: [],
          substeps: ['']
        }
      });
    }
  };

  const addSubstep = (stepIndex: number) => {
    const step = formData.steps[stepIndex];
    const updatedStep = {
      ...step,
      instructions: {
        ...step.instructions,
        substeps: [...step.instructions.substeps, '']
      }
    };
    updateStep(stepIndex, updatedStep);
  };

  const updateSubstep = (stepIndex: number, substepIndex: number, value: string) => {
    const step = formData.steps[stepIndex];
    const updatedSubsteps = step.instructions.substeps.map((substep, i) =>
      i === substepIndex ? value : substep
    );
    const updatedStep = {
      ...step,
      instructions: { ...step.instructions, substeps: updatedSubsteps }
    };
    updateStep(stepIndex, updatedStep);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Proceso Paso a Paso</h2>

      {/* Nuevo Paso */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Paso</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título del Paso</label>
            <input
              type="text"
              value={newStep.title || ''}
              onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: Corte de materiales, Ensamblaje, Pintura..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={newStep.instructions?.description || ''}
              onChange={(e) => setNewStep({
                ...newStep,
                instructions: { ...newStep.instructions!, description: e.target.value }
              })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe detalladamente este paso del proceso"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiempo Estimado (minutos)</label>
            <input
              type="number"
              value={newStep.instructions?.estimatedTime || 0}
              onChange={(e) => setNewStep({
                ...newStep,
                instructions: { ...newStep.instructions!, estimatedTime: Number(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Agregar Paso
          </button>
        </div>
      </div>

      {/* Lista de Pasos */}
      <div className="space-y-4">
        {formData.steps.map((step, stepIndex) => (
          <div key={step.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-medium text-gray-900">
                Paso {stepIndex + 1}: {step.title}
              </h4>
              <button
                type="button"
                onClick={() => removeStep(stepIndex)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  value={step.status}
                  onChange={(e) => updateStep(stepIndex, {
                    ...step,
                    status: e.target.value as Step['status']
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="not-started">No Iniciado</option>
                  <option value="in-progress">En Progreso</option>
                  <option value="completed">Completado</option>
                  <option value="skipped">Omitido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dificultad</label>
                <select
                  value={step.technical.difficulty}
                  onChange={(e) => updateStep(stepIndex, {
                    ...step,
                    technical: {
                      ...step.technical,
                      difficulty: e.target.value as 'low' | 'medium' | 'high'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subpasos</label>
              {step.instructions.substeps.map((substep, substepIndex) => (
                <div key={substepIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={substep}
                    onChange={(e) => updateSubstep(stepIndex, substepIndex, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder={`Subpaso ${substepIndex + 1}`}
                  />
                  {step.instructions.substeps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSubsteps = step.instructions.substeps.filter((_, i) => i !== substepIndex);
                        updateStep(stepIndex, {
                          ...step,
                          instructions: { ...step.instructions, substeps: updatedSubsteps }
                        });
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
                onClick={() => addSubstep(stepIndex)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Agregar subpaso
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Habilidades Requeridas</label>
                <input
                  type="text"
                  value={step.technical.skills.join(', ')}
                  onChange={(e) => updateStep(stepIndex, {
                    ...step,
                    technical: {
                      ...step.technical,
                      skills: e.target.value.split(',').map(skill => skill.trim())
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="soldadura, medición, pintura..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Técnicas</label>
                <input
                  type="text"
                  value={step.technical.techniques.join(', ')}
                  onChange={(e) => updateStep(stepIndex, {
                    ...step,
                    technical: {
                      ...step.technical,
                      techniques: e.target.value.split(',').map(tech => tech.trim())
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="corte recto, soldadura TIG, lijado..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};