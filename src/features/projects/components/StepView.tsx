'use client';

import { useState } from 'react';
import { Project } from '@/features/projects/types/project';
import { formatTime } from '@/features/projects/utils/utils';
import StepInstructions from './StepInstructions';
import StepResources from './StepResources';
import StepLessons from './StepLessons';

interface StepViewProps {
  project: Project;
  stepId: string;
}

export default function StepView({ project, stepId }: StepViewProps) {
  const [activeSection, setActiveSection] = useState('instructions');
  
  const step = project.steps.find(s => s.id === stepId);
  
  if (!step) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Paso no encontrado</h2>
        <p className="text-gray-600">El paso que buscas no existe en este proyecto.</p>
      </div>
    );
  }

  const sections = [
    { id: 'instructions', name: '📝 Instrucciones', component: StepInstructions },
    { id: 'resources', name: '🛠️ Recursos', component: StepResources },
    { id: 'lessons', name: '📈 Concejos', component: StepLessons },

    // { id: 'finishes', name: '🎨 Acabados', component: StepFinishes },
    // { id: 'quality', name: '🔍 Control Calidad', component: StepQuality },
    // { id: 'technical', name: '🏷️ Metadatos', component: StepTechnical },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || StepInstructions;

  return (
    <div className="space-y-6">
      {/* Header del paso */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.order}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {step.title}
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              {step.instructions.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${step.status === 'completed' ? 'bg-green-100 text-green-800' :
                step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'}
            `}>
              {step.status === 'completed' ? 'Completado' :
               step.status === 'in-progress' ? 'En progreso' : 'No iniciado'}
            </span>
            {/* {step.technical.critical && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                ⭐ Crítico
              </span>
            )} */}
          </div>
        </div>

        {/* Información rápida */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-gray-900">{formatTime(step.instructions.estimatedTime)}</div>
            <div className="text-gray-600">Tiempo estimado</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-gray-900">{step.resources.tools.length}</div>
            <div className="text-gray-600">Herramientas</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-gray-900">{step.resources.materials.length}</div>
            <div className="text-gray-600">Materiales</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-gray-900 capitalize">{step.technical.difficulty}</div>
            <div className="text-gray-600">Dificultad</div>
          </div>
        </div>
      </div>

      {/* Navegación de secciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  flex-shrink-0 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                  ${activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de la sección activa */}
        <div className="p-6">
          <ActiveComponent step={step} />
        </div>
      </div>
    </div>
  );
}