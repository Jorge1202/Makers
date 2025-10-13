'use client';

import { Project } from '@/features/projects/types/project';
import { MediaUpload } from '../MediaUpload';

interface BasicInfoStepProps {
  formData: Project;
  updateFormData: (updates: Partial<Project>) => void;
  addObjective: () => void;
  updateObjective: (index: number, value: string) => void;
  removeObjective: (index: number) => void;
  addInspiration: () => void;
  updateInspiration: (index: number, value: string) => void;
  removeInspiration: (index: number) => void;

  addFeaturedMedia: (files: FileList) => void;
  removeFeaturedMedia: (index: number) => void;
  setFeaturedMedia: (index: number) => void;
  updateMediaCaption: (index: number, caption: string) => void;
}

export const BasicInfoStep = ({ 
  formData, 
  updateFormData,  
  addFeaturedMedia,
  removeFeaturedMedia,
  setFeaturedMedia,
  updateMediaCaption
}: BasicInfoStepProps) => {

  const handleAddObjective = () => {
    updateFormData({
      objectives: [...formData.objectives, '']
    });
  };

  const handleUpdateObjective = (index: number, value: string) => {
    const newObjectives = formData.objectives.map((obj, i) => 
      i === index ? value : obj
    );
    updateFormData({ objectives: newObjectives });
  };

  const handleRemoveObjective = (index: number) => {
    updateFormData({
      objectives: formData.objectives.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Información Básica del Proyecto</h2>
      
      {/* Media Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Imágenes/Videos de Presentación
        </label>
        <MediaUpload
          media={formData.featuredMedia}
          onAddMedia={addFeaturedMedia}
          onRemoveMedia={removeFeaturedMedia}
          onSetFeatured={setFeaturedMedia}
          onUpdateCaption={updateMediaCaption}
          maxFiles={10}
        />
      </div>

      {/* Resto del formulario existente */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Título del Proyecto</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ej: Mesa de madera reciclada con diseño moderno"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Título del Proyecto</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ej: Mesa de madera reciclada con diseño moderno"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción Corta</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Una breve descripción de tu proyecto (máx. 200 caracteres)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción Completa</label>
        <textarea
          value={formData.fullDescription}
          onChange={(e) => updateFormData({ fullDescription: e.target.value })}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Explica en detalle qué es este proyecto, por qué lo creas, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Objetivos</label>
        {formData.objectives.map((objective, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={objective}
              onChange={(e) => handleUpdateObjective(index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: Aprender a trabajar con madera"
            />
            {formData.objectives.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveObjective(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddObjective}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Agregar objetivo
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resultado Esperado</label>
        <textarea
          value={formData.expectedResult}
          onChange={(e) => updateFormData({ expectedResult: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="¿Qué esperas obtener al finalizar este proyecto?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={formData.status}
            onChange={(e) => updateFormData({ status: e.target.value as Project['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="planning">Planificación</option>
            <option value="in-progress">En Progreso</option>
            <option value="completed">Completado</option>
            <option value="paused">Pausado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dificultad</label>
          <select
            value={formData.difficulty}
            onChange={(e) => updateFormData({ difficulty: e.target.value as Project['difficulty'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
            <option value="expert">Experto</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ej: Carpintería, Electrónica, Costura..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => updateFormData({ tags: e.target.value.split(',').map(tag => tag.trim()) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="madera, reciclaje, diseño, moderno (separadas por comas)"
        />
      </div>
    </div>
  );
};