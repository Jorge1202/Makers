'use client';

import { Project, Material, Tool } from '@/features/projects/types/project';
import { useState } from 'react';

interface PlanningStepProps {
  formData: Project;
  updateFormData: (updates: Partial<Project>) => void;
  addMaterial: (material: Material) => void;
  updateMaterial: (index: number, material: Material) => void;
  removeMaterial: (index: number) => void;
}

export const PlanningStep = ({ 
  formData, 
  updateFormData,
  addMaterial,
  updateMaterial,
  removeMaterial
}: PlanningStepProps) => {
  const [newMaterial, setNewMaterial] = useState<Material>({
    name: '',
    quantity: '',
    cost: 0,
    notes: ''
  });

  const [newTool, setNewTool] = useState<Tool>({
    name: '',
    quantity: '',
    notes: ''
  });

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.quantity) {
      addMaterial(newMaterial);
      setNewMaterial({ name: '', quantity: '', cost: 0, notes: '' });
    }
  };

  const handleAddTool = () => {
    if (newTool.name) {
      updateFormData({
        planning: {
          ...formData.planning,
          tools: [...formData.planning.tools, newTool]
        }
      });
      setNewTool({ name: '', quantity: '', notes: '' });
    }
  };

  const handleAddTimelinePhase = () => {
    updateFormData({
      planning: {
        ...formData.planning,
        timeline: [
          ...formData.planning.timeline,
          { phase: '', startDate: '', description: '' }
        ]
      }
    });
  };

  const updateTimelinePhase = (index: number, field: string, value: string) => {
    const newTimeline = formData.planning.timeline.map((phase, i) =>
      i === index ? { ...phase, [field]: value } : phase
    );
    updateFormData({
      planning: { ...formData.planning, timeline: newTimeline }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Planificación del Proyecto</h2>

      {/* Timeline */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cronograma</h3>
        {formData.planning.timeline.map((phase, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fase</label>
                <input
                  type="text"
                  value={phase.phase}
                  onChange={(e) => updateTimelinePhase(index, 'phase', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ej: Diseño, Construcción, Acabados"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                <input
                  type="date"
                  value={phase.startDate}
                  onChange={(e) => updateTimelinePhase(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={phase.description}
                onChange={(e) => updateTimelinePhase(index, 'description', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe las actividades de esta fase"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTimelinePhase}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Agregar fase
        </button>
      </div>

      {/* Presupuesto */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Presupuesto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Presupuesto Estimado ($)</label>
            <input
              type="number"
              value={formData.planning.budget.estimated}
              onChange={(e) => updateFormData({
                planning: {
                  ...formData.planning,
                  budget: { ...formData.planning.budget, estimated: Number(e.target.value) }
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Materiales */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Materiales</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
          <input
            type="text"
            placeholder="Nombre"
            value={newMaterial.name}
            onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Cantidad"
            value={newMaterial.quantity}
            onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Costo"
            value={newMaterial.cost || ''}
            onChange={(e) => setNewMaterial({ ...newMaterial, cost: Number(e.target.value) })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddMaterial}
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        
        {formData.planning.materials.map((material, index) => (
          <div key={index} className="flex items-center justify-between border-b py-2">
            <div className="flex-1">
              <span className="font-medium">{material.name}</span>
              <span className="text-gray-600 ml-2">({material.quantity})</span>
              {material.cost && <span className="text-green-600 ml-2">${material.cost}</span>}
            </div>
            <button
              type="button"
              onClick={() => removeMaterial(index)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Herramientas */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Herramientas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          <input
            type="text"
            placeholder="Nombre herramienta"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Cantidad"
            value={newTool.quantity || ''}
            onChange={(e) => setNewTool({ ...newTool, quantity: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddTool}
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        
        {formData.planning.tools.map((tool, index) => (
          <div key={index} className="flex items-center justify-between border-b py-2">
            <div>
              <span className="font-medium">{tool.name}</span>
              {tool.quantity && <span className="text-gray-600 ml-2">({tool.quantity})</span>}
            </div>
            <button
              type="button"
              onClick={() => {
                const newTools = formData.planning.tools.filter((_, i) => i !== index);
                updateFormData({
                  planning: { ...formData.planning, tools: newTools }
                });
              }}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Espacio de Trabajo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Espacio de Trabajo</label>
        <textarea
          value={formData.planning.workspace}
          onChange={(e) => updateFormData({
            planning: { ...formData.planning, workspace: e.target.value }
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe el espacio donde trabajarás (taller, garage, sala de estar...)"
        />
      </div>
    </div>
  );
};